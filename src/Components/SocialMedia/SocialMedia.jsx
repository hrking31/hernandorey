import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuCheck, LuCopy, LuMail } from "react-icons/lu";

const EMAIL = "hrking31@gmail.com";

const iconClass =
  "flex size-11 items-center justify-center rounded-full bg-black/10 text-ink transition duration-200 hover:scale-110 hover:text-white dark:bg-white/20 dark:text-ink-dark";

export default function SocialMedia() {
  const [copied, setCopied] = useState(false);

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
        aria-label="GitHub de Hernando Rey"
        title="GitHub"
        className={`${iconClass} hover:bg-[#171515]`}
      >
        <FaGithub className="size-5" />
      </a>
      <a
        href="https://www.linkedin.com/in/hernandorey/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn de Hernando Rey"
        title="LinkedIn"
        className={`${iconClass} hover:bg-[#0a66c2]`}
      >
        <FaLinkedin className="size-5" />
      </a>
      <a
        href={`mailto:${EMAIL}`}
        aria-label={`Escribir a ${EMAIL}`}
        title={EMAIL}
        className={`${iconClass} hover:bg-brand-strong`}
      >
        <LuMail className="size-5" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar correo"
        title={copied ? "¡Copiado!" : "Copiar correo"}
        className={`${iconClass} hover:bg-brand-strong`}
      >
        {copied ? <LuCheck className="size-5" /> : <LuCopy className="size-5" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Correo copiado" : ""}
      </span>
    </div>
  );
}
