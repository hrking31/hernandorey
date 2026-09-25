// Inclina las tarjetas .reveal-card hacia el cursor (solo con mouse) y mueve
// el brillo con --mx/--my. Se usan como onPointerMove / onPointerOut del
// contenedor de las tarjetas. Estilos: .reveal-card en index.css.
export function tilt(event) {
  if (event.pointerType !== "mouse") return;
  const card = event.target.closest(".reveal-card");
  if (!card) return;
  const r = card.getBoundingClientRect();
  const x = (event.clientX - r.left) / r.width;
  const y = (event.clientY - r.top) / r.height;
  card.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
  card.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
  card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
  card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
}

export function untilt(event) {
  const card = event.target.closest(".reveal-card");
  if (!card || card.contains(event.relatedTarget)) return;
  card.style.removeProperty("--rx");
  card.style.removeProperty("--ry");
}
