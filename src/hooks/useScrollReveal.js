import { useLayoutEffect } from "react";

const PROGRESS_STEPS = Array.from({ length: 41 }, (_, i) => i / 40);

// Anima los elementos [data-reveal] (el contenedor o sus descendientes) cada
// vez que entran en pantalla, al bajar y al subir. El estado va en data-rv:
//   wait → listo para animarse (oculto)
//   in   → animándose
//   done → animación terminada (desde aquí responde al mouse sin retraso)
// Lo que ya se ve al cargar queda en "done" (la página se ve completa de
// entrada), salvo con { onLoad: true }, que también lo anima al abrir la página.
// Se prepara antes de pintar (useLayoutEffect) para que nada parpadee.
//
// Además, en los [data-progress] escribe --p (0 al entrar, 1 bien visible)
// para efectos que siguen al scroll.
export default function useScrollReveal(ref, deps, { onLoad = false } = {}) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = [
      ...(root.matches("[data-reveal]") ? [root] : []),
      ...root.querySelectorAll("[data-reveal]"),
    ];
    const tracked = [...root.querySelectorAll("[data-progress]")];
    const frames = [];

    const show = (el) => {
      el.dataset.rv = "in";
      const onEnd = (e) => {
        if (e.target !== el) return;
        el.removeEventListener("transitionend", onEnd);
        if (el.dataset.rv === "in") el.dataset.rv = "done";
      };
      el.addEventListener("transitionend", onEnd);
    };

    // Salió por completo: vuelve al inicio sin transición (nadie lo ve).
    const hide = (el) => {
      el.dataset.rvInstant = "";
      el.dataset.rv = "wait";
      frames.push(requestAnimationFrame(() =>
        frames.push(requestAnimationFrame(() => delete el.dataset.rvInstant))
      ));
    };

    // Estado inicial, antes de que el navegador pinte. Medir con
    // getBoundingClientRect ya calcula los estilos, así que "wait" se aplica
    // sin transición (data-rv-instant); si no, el ocultarse también se animaría.
    const onLoadItems = [];
    items.forEach((el) => {
      const r = el.getBoundingClientRect();
      const visible = r.top < innerHeight && r.bottom > 0;
      if (visible && !onLoad) {
        el.dataset.rv = "done";
        return;
      }
      el.dataset.rvInstant = "";
      el.dataset.rv = "wait";
      if (visible) onLoadItems.push(el);
    });
    root.getBoundingClientRect(); // fija el estado "wait" sin animarlo
    items.forEach((el) => delete el.dataset.rvInstant);
    frames.push(
      requestAnimationFrame(() =>
        frames.push(requestAnimationFrame(() => onLoadItems.forEach(show)))
      )
    );

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (entry.intersectionRatio >= 0.12 && el.dataset.rv === "wait") show(el);
          else if (!entry.isIntersecting && el.dataset.rv !== "wait") hide(el);
        }
      },
      { threshold: [0, 0.12] }
    );

    const progress = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const tall = Math.min(entry.boundingClientRect.height, 720);
          const p = Math.min(1, entry.intersectionRect.height / (tall * 0.7));
          entry.target.style.setProperty("--p", p.toFixed(3));
        }
      },
      { threshold: PROGRESS_STEPS }
    );

    items.forEach((el) => reveal.observe(el));
    tracked.forEach((el) => progress.observe(el));

    return () => {
      frames.forEach(cancelAnimationFrame);
      reveal.disconnect();
      progress.disconnect();
      items.forEach((el) => {
        delete el.dataset.rv;
        delete el.dataset.rvInstant;
      });
      tracked.forEach((el) => el.style.removeProperty("--p"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
