// Ruta interna de Firebase Storage (logos/123_foto.png) a partir de su URL
// de descarga. Sirve para saber si dos URLs apuntan al mismo archivo.
export function storagePath(url) {
  const match = /\/o\/([^?]+)/.exec(url ?? "");
  return match ? decodeURIComponent(match[1]) : "";
}

// Nombre de archivo único y sin caracteres raros para subir a Storage.
export function uploadName(file) {
  return `${Date.now()}_${file.name.replace(/[^\w.-]+/g, "_")}`;
}
