import { useLocation } from "react-router-dom";

// El idioma lo decide la URL: lo que empieza con /en va en inglés y el resto
// en español. Así el enlace que se envía muestra siempre el idioma elegido.

// Páginas que solo existen en español (no tienen versión /en).
const SPANISH_ONLY = ["/admin", "/signin"];

export function langFromPath(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function isSpanishOnly(pathname) {
  return SPANISH_ONLY.includes(pathname);
}

// "/hola" → "/en/hola" en inglés; en español queda igual.
export function localizePath(path, lang) {
  if (lang !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

// La misma página en el otro idioma: "/en/blog" ↔ "/blog".
export function switchLangPath(pathname, lang) {
  const base = langFromPath(pathname) === "en" ? pathname.slice(3) || "/" : pathname;
  return localizePath(base, lang);
}

// El visitante eligió idioma con el selector o cerró el aviso: no se le vuelve a ofrecer.
export function saveLangChoice(lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch {
    // Sin acceso a localStorage: la elección vale solo para esta visita.
  }
}

export function hasLangChoice() {
  try {
    return localStorage.getItem("lang") !== null;
  } catch {
    return false;
  }
}

// Idioma de la página actual y una función para que los enlaces internos lo conserven.
export function useLang() {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return { lang, to: (path) => localizePath(path, lang) };
}
