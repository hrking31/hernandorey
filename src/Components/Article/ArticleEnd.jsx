import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buttonPrimary, buttonSecondary } from "../Layout/Layout";
import { EMAIL, LINKEDIN } from "../SocialMedia/SocialMedia";
import { loadProjects } from "../../utils/projects";
import { useLang } from "../../i18n/lang";

function Box({ eyebrow, title, children }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-card p-[22px] dark:border-line-dark dark:bg-card-dark">
      <p className="text-xs font-extrabold tracking-[.08em] text-brand-strong uppercase dark:text-brand">
        {eyebrow}
      </p>
      <h3 className="text-xl font-black">{title}</h3>
      {children}
    </div>
  );
}

// Final del artículo: quien llega hasta aquí tiene a dónde seguir. El proyecto
// relacionado es el que tiene en el panel el enlace a este artículo.
export default function ArticleEnd({ slug }) {
  const { t } = useTranslation();
  const { to } = useLang();
  const [related, setRelated] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    loadProjects()
      .then((list) => {
        if (!active) return;
        const match = list.find((p) =>
          p.blogUrl.toLowerCase().replace(/\/+$/, "").endsWith(`/blog/${slug}`)
        );
        setRelated(match ?? null);
      })
      .catch(() => {
        // Sin proyectos, el final muestra solo el contacto.
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-12 grid gap-[18px] min-[800px]:grid-cols-2 print:hidden">
      <Box eyebrow={t("post.helped")} title={t("post.write")}>
        <p className="font-semibold text-muted dark:text-muted-dark">{t("post.writeText")}</p>
        <p className="font-extrabold select-all">{EMAIL}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-1">
          <button type="button" onClick={copy} className={buttonPrimary}>
            {copied ? t("post.copied") : t("post.copy")}
          </button>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
            LinkedIn
          </a>
        </div>
      </Box>

      {related && (
        <Box eyebrow={t("post.related")} title={related.title}>
          {related.description && (
            <p className="font-semibold text-muted dark:text-muted-dark">{related.description}</p>
          )}
          <div className="mt-auto flex flex-wrap gap-3 pt-1">
            <Link to={to("/proyectos")} className={buttonPrimary}>
              {t("post.seeProject")}
            </Link>
            {related.repoUrl && (
              <a href={related.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                {t("post.code")}
              </a>
            )}
          </div>
        </Box>
      )}
    </section>
  );
}
