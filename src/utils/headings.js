import { Children } from "react";

// "🤔 Por qué una pantalla" → "por-que-una-pantalla". Se usa igual para el
// índice (desde el Markdown) y para el id del título ya dibujado, así coinciden.
export function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Texto plano de lo que React Markdown pasa como children de un título.
export function textOf(children) {
  return Children.toArray(children)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : textOf(child?.props?.children)
    )
    .join("");
}

// Títulos "## " del artículo para el índice, sin contar los que hay dentro de
// bloques de código. El texto se muestra sin el emoji inicial.
export function headingsOf(markdown) {
  const headings = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCode = !inCode;
      continue;
    }
    const match = !inCode && /^## (.+?)\s*#*$/.exec(line);
    if (!match) continue;
    // Quita el formato de Markdown: **negrita**, `código` y [enlaces](url).
    const text = match[1].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");
    headings.push({ id: slugify(text), text: text.replace(/^[^\p{L}\p{N}]+/u, "").trim() });
  }
  return headings;
}
