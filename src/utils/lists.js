// Convierte lo que venga del formulario o de Firestore en una lista limpia.
// Acepta un arreglo o un texto separado por comas (o por saltos de línea).
export function toList(value, separator = ",") {
  const items = Array.isArray(value) ? value : String(value ?? "").split(separator);
  return items.map((item) => String(item).trim()).filter(Boolean);
}

// Elementos que aparecen más de una vez (sin distinguir mayúsculas).
// En el sitio cada uno es una key de React, así que no pueden repetirse.
export function duplicatesOf(value, separator = ",") {
  const seen = new Set();
  const repeated = new Map();
  for (const item of toList(value, separator)) {
    const key = item.toLowerCase();
    if (seen.has(key)) repeated.set(key, item);
    seen.add(key);
  }
  return [...repeated.values()];
}
