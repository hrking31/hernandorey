import { useTranslation } from "react-i18next";
import { LuLanguages } from "react-icons/lu";
import { useLang } from "../../i18n/lang";

// En /en avisa que los artículos están en español. Los artículos llevan
// lang="es", así el navegador ofrece traducirlos.
export default function SpanishNote({ className = "" }) {
  const { t } = useTranslation();
  const { lang } = useLang();
  if (lang !== "en") return null;

  return (
    <p
      className={`flex items-start gap-2.5 rounded-xl border border-line bg-card px-4 py-3 text-[15px] font-semibold dark:border-line-dark dark:bg-card-dark print:hidden ${className}`}
    >
      <LuLanguages aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-strong dark:text-brand" />
      {t("blog.spanish")}
    </p>
  );
}
