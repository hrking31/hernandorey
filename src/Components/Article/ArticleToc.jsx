import { useState } from "react";
import { useTranslation } from "react-i18next";

// Índice del artículo: abierto y fijo al costado en PC; plegado arriba del
// texto en celular. Cada enlace baja a su título (ver ScrollManager).
export default function ArticleToc({ headings }) {
  const { t } = useTranslation();
  const [wide] = useState(() => window.matchMedia("(min-width: 1100px)").matches);

  if (headings.length < 2) return null;

  return (
    <details
      open={wide}
      className="rounded-[14px] border border-line bg-card px-4 py-3.5 dark:border-line-dark dark:bg-card-dark min-[1100px]:sticky min-[1100px]:top-24 min-[1100px]:order-2 print:hidden"
    >
      <summary className="cursor-pointer font-extrabold">{t("post.toc")}</summary>
      <ol className="mt-2.5 grid list-decimal gap-1.5 pl-5 text-sm font-semibold">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-muted hover:text-brand-strong dark:text-muted-dark dark:hover:text-brand"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
