// Copia al proyecto las notas de Obsidian marcadas con `publicar: true`.
//
// Uso: npm run blog
//
// Lee la bóveda indicada en BLOG_VAULT_PATH (archivo .env.local), convierte la
// sintaxis propia de Obsidian a Markdown estándar y deja cada artículo en
// src/content/blog/<slug>/index.md con sus imágenes en img/. Además genera
// src/content/blog/posts.json con los datos que usa la lista del blog.
// La bóveda solo se lee: nunca se escribe en ella.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = path.join(root, ".env.local");
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const vault = process.env.BLOG_VAULT_PATH;
if (!vault || !fs.existsSync(vault)) {
  console.error(
    "✖ No encuentro la bóveda. Define BLOG_VAULT_PATH en .env.local con la ruta a tu carpeta de Obsidian."
  );
  process.exit(1);
}

const outDir = path.join(root, "src", "content", "blog");
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const OPTIMIZABLE = /\.(png|jpe?g|webp)$/i;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".")) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const vaultFiles = walk(vault);
const byName = new Map(vaultFiles.map((file) => [path.basename(file), file]));

// Busca un archivo como lo hace Obsidian: junto a la nota o por nombre en la bóveda.
function locate(ref, noteDir) {
  const clean = decodeURI(ref.split("|")[0].trim());
  const near = path.resolve(noteDir, clean);
  if (fs.existsSync(near)) return near;
  return byName.get(path.basename(clean)) ?? null;
}

// Un Canvas no se puede mostrar en la web: se usa su exportación como imagen.
function canvasImage(ref, noteDir) {
  const base = path.basename(ref.split("|")[0].trim(), ".canvas");
  for (const ext of [".png", ".jpg", ".jpeg", ".webp", ".svg"]) {
    const found = locate(base + ext, noteDir);
    if (found) return found;
  }
  return null;
}

async function processNote(file, frontmatter, body) {
  const noteDir = path.dirname(file);
  const title = frontmatter.title ?? path.basename(file, ".md");
  const slug = slugify(frontmatter.slug ?? title);
  const target = path.join(outDir, slug);
  const warnings = [];
  const copied = new Map();
  const jobs = [];

  // Se regeneran las imágenes en cada ejecución para no dejar restos.
  fs.rmSync(path.join(target, "img"), { recursive: true, force: true });
  fs.mkdirSync(path.join(target, "img"), { recursive: true });

  // Copia una imagen a img/ con un nombre seguro y devuelve la ruta relativa.
  // Las fotos se reducen a 1600 px de ancho y se convierten a WebP.
  const copyImage = (source) => {
    if (!copied.has(source)) {
      const ext = path.extname(source).toLowerCase();
      const base = slugify(path.basename(source, ext));
      const optimize = OPTIMIZABLE.test(ext);
      const name = optimize ? `${base}.webp` : `${base}${ext}`;
      const dest = path.join(target, "img", name);
      jobs.push(
        optimize
          ? sharp(source)
              .rotate()
              .resize({ width: 1600, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(dest)
          : fs.promises.copyFile(source, dest)
      );
      copied.set(source, `img/${name}`);
    }
    return copied.get(source);
  };

  const image = (ref, alt) => {
    const source = ref.endsWith(".canvas") ? canvasImage(ref, noteDir) : locate(ref, noteDir);
    if (!source) {
      warnings.push(
        ref.endsWith(".canvas")
          ? `Canvas sin exportar: "${ref}". Expórtalo como imagen desde Obsidian con el mismo nombre.`
          : `Imagen no encontrada: "${ref}"`
      );
      return "";
    }
    return `![${alt}](${copyImage(source)})`;
  };

  const cover = frontmatter.portada ? locate(String(frontmatter.portada), noteDir) : null;
  const coverPath = cover ? copyImage(cover) : "";

  const content = body
    // <img src="..."> en HTML: si es la portada se quita (la página ya la muestra).
    .replace(/<img\s[^>]*src="([^"]+)"[^>]*>\s*/g, (_, src) => {
      const source = locate(src, noteDir);
      return source && source === cover ? "" : image(src, "") + "\n\n";
    })
    // ![[imagen.png]], ![[imagen.png|texto]] y ![[diagrama.canvas]]
    .replace(/!\[\[([^\]]+)\]\]/g, (_, ref) => image(ref, ref.split("|")[1] ?? ""))
    // [[diagrama.canvas]] enlazado: también se muestra como imagen.
    .replace(/\[\[([^\]]+\.canvas)\]\]/g, (_, ref) => image(ref, "Diagrama"))
    // [[Otra nota]] o [[Otra nota|alias]]: queda solo el texto.
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, name, alias) => alias ?? name)
    // ![texto](ruta/relativa.png). Las que ya convirtieron los pasos
    // anteriores (img/…webp) se dejan igual: no existen en la bóveda.
    .replace(/!\[([^\]]*)\]\((?!https?:)([^)\s]+)\)/g, (match, alt, ref) =>
      [...copied.values()].includes(ref) ? match : image(ref, alt)
    )
    // El título (# ...) y el subtítulo en cursiva del inicio ya los muestra la página.
    .replace(/^\s*#\s[^\n]*\n+/, "")
    .replace(/^\s*[*_][^*_\n]+[*_]\s*\n+/, "");

  fs.writeFileSync(path.join(target, "index.md"), content.trim() + "\n");
  await Promise.all(jobs);

  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    meta: {
      slug,
      title,
      subtitle: frontmatter.subtitulo ?? "",
      description: frontmatter.descripcion ?? "",
      date: frontmatter.fecha ? String(frontmatter.fecha) : "",
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      cover: coverPath,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    },
    images: copied.size,
    warnings,
  };
}

fs.mkdirSync(outDir, { recursive: true });

const published = [];
for (const file of vaultFiles.filter((f) => f.endsWith(".md"))) {
  const raw = fs.readFileSync(file, "utf8");
  const match = raw.match(FRONTMATTER);
  if (!match) continue;
  const frontmatter = YAML.parse(match[1]) ?? {};
  if (frontmatter.publicar !== true) continue;

  const result = await processNote(file, frontmatter, raw.slice(match[0].length));
  published.push(result.meta);
  console.log(`✔ ${result.meta.title}  →  ${result.meta.slug}  (${result.images} imágenes)`);
  for (const warning of result.warnings) console.warn(`  ⚠ ${warning}`);
}

// Quita del proyecto los artículos que ya no están marcados para publicar.
const slugs = new Set(published.map((p) => p.slug));
for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
  if (entry.isDirectory() && !slugs.has(entry.name)) {
    fs.rmSync(path.join(outDir, entry.name), { recursive: true });
    console.log(`✖ Retirado: ${entry.name}`);
  }
}

published.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(outDir, "posts.json"), JSON.stringify(published, null, 2) + "\n");

console.log(
  published.length
    ? `\n${published.length} artículo(s) listos en src/content/blog`
    : "\nNinguna nota tiene `publicar: true`. Agrégalo a los datos del inicio de la nota."
);
