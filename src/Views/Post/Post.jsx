import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import "highlight.js/styles/github-dark.css";
import { LuArrowLeft, LuCalendar, LuClock } from "react-icons/lu";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import { Page, Section } from "../../Components/Layout/Layout";
import remarkCallouts from "../../utils/remarkCallouts";
import { getPost, loadContent, imageUrl, formatDate } from "../../content/blog";
import { useLang } from "../../i18n/lang";

// Solo los lenguajes que aparecen en los artículos: el paquete completo pesa
// más del doble. Para uno nuevo, se importa y se agrega aquí.
const highlight = [
  rehypeHighlight,
  { languages: { bash, c, cpp, css, javascript, json, powershell, python, xml, yaml } },
];

export default function Post() {
  const { slug } = useParams();
  const post = getPost(slug);
  const [content, setContent] = useState(null);
  const { to } = useLang();

  useEffect(() => {
    if (!post) return;
    let active = true;
    setContent(null);
    loadContent(slug).then((text) => active && setContent(text));
    return () => {
      active = false;
    };
  }, [slug, post]);

  useEffect(() => {
    if (!post) return;
    const previous = document.title;
    document.title = `${post.title} · Hernando Rey`;
    return () => {
      document.title = previous;
    };
  }, [post]);

  if (!post) return <Navigate to={to("/blog")} replace />;

  const components = {
    img: ({ src = "", alt = "" }) => (
      <img src={imageUrl(slug, src)} alt={alt} loading="lazy" className="rounded-xl" />
    ),
    a: ({ href = "", children }) =>
      href.startsWith("http") ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      ),
    // Las tablas anchas se desplazan en horizontal en el celular.
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table>{children}</table>
      </div>
    ),
  };

  return (
    <Page>
      <Section as="article" className="mb-16 lg:mb-20">
        <Link
          to={to("/blog")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-brand-strong dark:text-muted-dark dark:hover:text-brand"
        >
          <LuArrowLeft aria-hidden="true" className="size-4" />
          Volver al blog
        </Link>

        <header className="mb-8 flex flex-col gap-4">
          {post.tags.length > 0 && (
            <ul aria-label="Etiquetas" className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-chip px-2 py-0.5 text-xs font-bold text-muted dark:bg-chip-dark dark:text-muted-dark"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
          <h1 className="text-[2rem] leading-tight font-black lg:text-[2.8rem]">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg leading-snug font-semibold text-muted italic dark:text-muted-dark">
              {post.subtitle}
            </p>
          )}
          <p className="flex flex-wrap gap-4 text-sm font-semibold text-muted dark:text-muted-dark">
            {post.date && (
              <span className="flex items-center gap-1.5">
                <LuCalendar aria-hidden="true" className="size-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <LuClock aria-hidden="true" className="size-4" />
              {post.readingMinutes} min de lectura
            </span>
          </p>
        </header>

        {post.cover && (
          <img
            src={post.cover}
            alt=""
            className="mb-10 max-h-[28rem] w-full rounded-2xl object-cover"
          />
        )}

        {content === null ? (
          <div className="flex flex-col gap-3" aria-label="Cargando artículo">
            {[100, 92, 96, 80].map((width) => (
              <div
                key={width}
                style={{ width: `${width}%` }}
                className="h-4 animate-pulse rounded bg-chip dark:bg-chip-dark"
              />
            ))}
          </div>
        ) : (
          <div className="prose max-w-none prose-neutral lg:prose-lg dark:prose-invert prose-headings:font-black prose-a:text-brand-strong dark:prose-a:text-brand prose-code:before:content-none prose-code:after:content-none prose-pre:p-0 prose-pre:bg-[#0d1117]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkCallouts]}
              rehypePlugins={[highlight]}
              components={components}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </Section>

      <SocialMedia />
    </Page>
  );
}
