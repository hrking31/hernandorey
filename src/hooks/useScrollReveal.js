import { useEffect } from "react";

const PROGRESS_STEPS = Array.from({ length: 41 }, (_, i) => i / 40);

// Anima los elementos [data-reveal] (el contenedor o sus descendientes) cada
// vez que entran en pantalla, al bajar y al subir. El estado va en data-rv:
//   wait → fuera de pantalla, listo para animarse
//   in   → animándose
//   done → animación terminada (desde aquí responde al mouse sin retraso)
// Lo que ya se ve al cargar queda en "done": la página se ve completa de entrada.
//
// Además, en los [data-progress] escribe --p (0 al entrar, 1 bien visible)
// para efectos que siguen al scroll.
export default function useScrollReveal(ref, deps) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = [
      ...(root.matches("[data-reveal]") ? [root] : []),
      ...root.querySelectorAll("[data-reveal]"),
    ];
    const tracked = [...root.querySelectorAll("[data-progress]")];
    const seen = new WeakSet();

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
      requestAnimationFrame(() =>
        requestAnimationFrame(() => delete el.dataset.rvInstant)
      );
    };

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (!seen.has(el)) {
            seen.add(el);
            el.dataset.rv = entry.isIntersecting ? "done" : "wait";
            continue;
          }
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
