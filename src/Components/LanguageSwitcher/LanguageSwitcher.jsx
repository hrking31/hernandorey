import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { langFromPath, saveLangChoice, switchLangPath } from "../../i18n/lang";

// Botón al lado del tema: muestra el idioma al que se pasa (EN o ES) y lleva a
// la misma página en ese idioma. Es un enlace, así Google también encuentra /en.
// No conserva el #ancla: quedaría la última sección tocada en el índice del
// artículo y la página bajaría hasta ella; el cambio de idioma empieza arriba.
export default function LanguageSwitcher() {
  const { pathname, search } = useLocation();
  const { t } = useTranslation();
  const target = langFromPath(pathname) === "en" ? "es" : "en";

  return (
    <Link
      to={switchLangPath(pathname, target) + search}
      onClick={() => saveLangChoice(target)}
      hrefLang={target}
      lang={target}
      aria-label={t("language.switch")}
      title={t("language.switch")}
      className="flex size-11 items-center justify-center rounded-full bg-black/10 text-sm font-black text-ink transition-colors hover:bg-black/20 dark:bg-white/20 dark:text-ink-dark dark:hover:bg-white/30"
    >
      {target.toUpperCase()}
    </Link>
  );
}
