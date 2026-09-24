import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./context";

// Sin elección guardada se usa la preferencia del sistema. index.html aplica
// la misma lógica antes de pintar, para que no haya un destello de color.
function initialMode() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Sin acceso a localStorage (modo privado estricto): se usa el sistema.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme: () =>
        setMode((prev) => {
          const next = prev === "dark" ? "light" : "dark";
          try {
            localStorage.setItem("theme", next);
          } catch {
            // Si no se puede guardar, el cambio vale solo para esta visita.
          }
          return next;
        }),
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
