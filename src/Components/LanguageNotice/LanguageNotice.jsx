import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuX } from "react-icons/lu";
import { hasLangChoice, isSpanishOnly, langFromPath, saveLangChoice, switchLangPath } from "../../i18n/lang";

function browserIsSpanish() {
  const first = navigator.languages?.[0] || navigator.language || "";
  return first.toLowerCase().startsWith("es");
}

// Sugiere el inglés a quien entra a una página en español con el navegador en
// otro idioma. No redirige: el enlace que se envía manda, y el aviso se cierra
// para siempre al elegir idioma o al tocar la X.
export default function LanguageNotice() {
  const { pathname, search } = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(() => !browserIsSpanish());

  // hasLangChoice se mira en cada render: el selector de la barra también guarda la elección.
  if (!open || hasLangChoice() || langFromPath(pathname) !== "es" || isSpanishOnly(pathname)) {
    return null;
  }

  const close = (lang) => {
    saveLangChoice(lang);
    setOpen(false);
  };

  // El aviso va siempre en inglés: es para quien no lee español.
  const en = (key) => t(key, { lng: "en" });

  return (
    <aside
      lang="en"
      aria-label={en("notice.label")}
      className="fixed inset-x-3 bottom-20 z-[1000] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-line bg-card p-3 pl-4 shadow-xl shadow-black/15 dark:border-line-dark dark:bg-card-dark min-[993px]:top-20 min-[993px]:right-4 min-[993px]:bottom-auto min-[993px]:left-auto min-[993px]:mx-0 print:hidden"
    >
      <p className="flex-1 text-sm leading-snug font-semibold">{en("notice.text")}</p>
      <Link
        to={switchLangPath(pathname, "en") + search}
        onClick={() => close("en")}
        hrefLang="en"
        className="flex h-11 shrink-0 items-center rounded-full bg-ink px-4 text-sm font-bold text-surface dark:bg-ink-dark dark:text-surface-dark"
      >
        {en("notice.action")}
      </Link>
      <button
        type="button"
        onClick={() => close("es")}
        aria-label={en("notice.close")}
        className="flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-black/10 dark:text-muted-dark dark:hover:bg-white/20"
      >
        <LuX className="size-5" aria-hidden="true" />
      </button>
    </aside>
  );
}
