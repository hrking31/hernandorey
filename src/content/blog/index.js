// Artículos del blog generados por `npm run blog` (ver scripts/sync-blog.mjs).
import manifest from "./posts.json";

// El texto de cada artículo se carga solo al abrirlo.
const contents = import.meta.glob("./*/index.md", {
  query: "?raw",
  import: "default",
});

const images = import.meta.glob("./*/img/*", {
  query: "?url",
  import: "default",
  eager: true,
});

// Convierte una ruta relativa del artículo (img/foto.jpg) en la URL final.
export function imageUrl(slug, src) {
  return images[`./${slug}/${src.replace(/^\.\//, "")}`] ?? src;
}

export const posts = manifest.map((post) => ({
  ...post,
  cover: post.cover ? imageUrl(post.slug, post.cover) : "",
}));

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}

export function loadContent(slug) {
  const load = contents[`./${slug}/index.md`];
  return load ? load() : Promise.resolve("");
}

export function formatDate(date) {
  if (!date) return "";
  return new Date(`${date}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
