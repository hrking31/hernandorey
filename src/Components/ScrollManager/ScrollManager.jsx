import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página vuelve arriba; si la URL trae #ancla, baja hasta ella.
// El contenido llega de Firestore después de montar, así que se reintenta un momento.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let tries = 0;
    const timer = setInterval(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      tries += 1;
      if (target || tries > 30) {
        clearInterval(timer);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
