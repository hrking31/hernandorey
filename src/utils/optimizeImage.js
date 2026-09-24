// Reduce y convierte a WebP una imagen en el navegador antes de subirla.
// SVG, GIF y otros formatos se devuelven sin cambios, igual que cualquier
// imagen que después de convertirla no quede más liviana.

const OPTIMIZABLE = ["image/jpeg", "image/png", "image/webp"];

export async function optimizeImage(file, { maxWidth = 1600, quality = 0.82 } = {}) {
  if (!OPTIMIZABLE.includes(file.type)) return file;

  // "from-image" respeta la orientación de las fotos tomadas con el celular.
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
  if (!blob || blob.size >= file.size) return file;

  // Algunos navegadores antiguos no generan WebP y devuelven PNG.
  const ext = blob.type === "image/webp" ? "webp" : blob.type.split("/")[1];
  const name = `${file.name.replace(/\.[^.]+$/, "")}.${ext}`;
  return new File([blob], name, { type: blob.type });
}

export function formatSize(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`
    : `${Math.round(bytes / 1024)} kB`;
}
