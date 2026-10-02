import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuCheck, LuCopy, LuMail } from "react-icons/lu";

export const EMAIL = "hrking31@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/hernandorey/";

const iconClass =
  "flex size-11 items-center justify-center rounded-full bg-black/10 text-ink transition duration-200 hover:scale-110 hover:text-white dark:bg-white/20 dark:text-ink-dark";

export default function SocialMedia() {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // El margen inferior deja libre la barra de navegación, que en móvil va abajo.
    <div className="flex justify-center gap-6 pb-28 lg:pb-14 print:hidden">
      <a
        href="https://github.com/hrking31"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("social.github")}
        title="GitHub"
        className={`${iconClass} hover:bg-[#171515]`}
      >
        <FaGithub className="size-5" />
      </a>
      <a
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("social.linkedin")}
        title="LinkedIn"
        className={`${iconClass} hover:bg-[#0a66c2]`}
      >
        <FaLinkedin className="size-5" />
      </a>
      <a
        href={`mailto:${EMAIL}`}
        aria-label={t("social.mail", { email: EMAIL })}
        title={EMAIL}
        className={`${iconClass} hover:bg-brand-strong`}
      >
        <LuMail className="size-5" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={t("post.copy")}
        title={copied ? t("post.copied") : t("post.copy")}
        className={`${iconClass} hover:bg-brand-strong`}
      >
        {copied ? <LuCheck className="size-5" /> : <LuCopy className="size-5" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? t("social.copied") : ""}
      </span>
    </div>
  );
}
