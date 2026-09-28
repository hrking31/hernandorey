// Aplica el tema antes de pintar para evitar un destello (ver ThemeContext.jsx).
// Está en un archivo aparte, y no dentro de index.html, porque la política de
// seguridad (CSP de firebase.json) no permite scripts escritos en la página.
try {
  var t = localStorage.getItem("theme");
  if (t !== "light" && t !== "dark")
    t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.classList.toggle("dark", t === "dark");
} catch (e) {}
