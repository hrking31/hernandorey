import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./es.json";
import en from "./en.json";
import { langFromPath } from "./lang";

// Arranca ya en el idioma de la URL, para que /en no pinte primero en español.
// Después, App.jsx lo cambia cada vez que la URL pasa de un idioma al otro.
i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: langFromPath(window.location.pathname),
  fallbackLng: "es",
  initAsync: false,
  // React ya escapa el texto.
  interpolation: { escapeValue: false },
});

export default i18n;
