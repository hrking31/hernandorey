// Convierte lo que venga del formulario o de Firestore en una lista limpia.
// Acepta un arreglo o un texto separado por comas (o por saltos de línea).
export function toList(value, separator = ",") {
  const items = Array.isArray(value) ? value : String(value ?? "").split(separator);
  return items.map((item) => String(item).trim()).filter(Boolean);
}
