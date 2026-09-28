// Enlace seguro para usar en href o src: solo deja pasar direcciones http(s)
// o rutas internas del sitio (/blog/...). Cualquier otra cosa (javascript:,
// data:, //otro-sitio) se descarta. React 18 no bloquea javascript: por sí solo.
export function safeUrl(url) {
  if (typeof url !== "string") return "";
  const value = url.trim();
  if (/^\/(?![/\\])/.test(value)) return value;
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : "";
  } catch {
    return "";
  }
}
