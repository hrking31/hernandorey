import { useRef } from "react";
import { Link } from "react-router-dom";
import { LuCalendar, LuClock } from "react-icons/lu";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import { Page, Section } from "../../Components/Layout/Layout";
import { posts, formatDate } from "../../content/blog";
import RevealText from "../../Components/RevealText/RevealText";
import useScrollReveal from "../../hooks/useScrollReveal";
import { tilt, untilt } from "../../utils/tilt";

// Misma animación que las tarjetas de proyectos (clases rv-* y .reveal-card
// en index.css): se levanta al entrar en pantalla y se inclina hacia el mouse.
function PostCard({ post, index }) {
  return (
    <article
      data-reveal
      style={{ "--i": index % 2 }}
      className="reveal-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card hover:shadow-xl hover:shadow-black/10 dark:border-line-dark dark:bg-card-dark"
    >
      {post.cover ? (
        <div className="h-52 overflow-hidden">
          <img
            src={post.cover}
            alt=""
            loading="lazy"
            className="rv-img size-full object-cover"
          />
        </div>
      ) : (
        <div className="h-3 bg-brand" aria-hidden="true" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {post.tags.length > 0 && (
          <ul aria-label="Etiquetas" className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag, j) => (
              <li
                key={tag}
                style={{ "--j": j }}
                className="rv-chip rounded-md bg-chip px-2 py-0.5 text-xs font-bold text-muted dark:bg-chip-dark dark:text-muted-dark"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}
        <h3 style={{ "--k": 1 }} className="rv text-xl leading-tight font-black group-hover:text-brand-strong dark:group-hover:text-brand">
          {/* El enlace cubre toda la tarjeta. */}
          <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.description && (
          <p style={{ "--k": 2 }} className="rv text-[15px] leading-relaxed font-medium text-muted dark:text-muted-dark">
            {post.description}
          </p>
        )}
        <p style={{ "--k": 3 }} className="rv mt-auto flex flex-wrap gap-4 pt-2 text-sm font-semibold text-muted dark:text-muted-dark">
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
      </div>
    </article>
  );
}

export default function Blog() {
  const listRef = useRef(null);
  useScrollReveal(listRef, [posts.length]);

  return (
    <Page>
      <Section as="header" className="mb-8">
        <h1 className="text-[2.4rem] leading-none font-black lg:text-[3.9rem]">
          <RevealText>Blog</RevealText>
        </h1>
      </Section>

      <Section className="mb-12">
        <p className="text-justify text-[clamp(0.95rem,0.9rem+0.3vw,1.2rem)] leading-relaxed font-medium hyphens-auto">
          En este espacio comparto mi viaje en el mundo tech a través de
          artículos, tutoriales, teoría aplicada y fragmentos de código. Exploro
          el desarrollo web, la automatización con Home Assistant, el teclado
          ergonómico Corne y proyectos que combinan programación con hardware.
        </p>
      </Section>

      <Section className="mb-16 lg:mb-20">
        <h2 className="relative mx-auto mb-10 w-fit pb-2 text-center text-[1.8rem] font-black after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-1/3 after:-translate-x-1/2 after:bg-brand lg:text-[2.6rem]">
          <RevealText>Artículos</RevealText>
        </h2>

        {posts.length > 0 ? (
          <ul
            ref={listRef}
            onPointerMove={tilt}
            onPointerOut={untilt}
            className="grid gap-8 md:grid-cols-2"
          >
            {posts.map((post, index) => (
              <li key={post.slug}>
                <PostCard post={post} index={index} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center font-semibold text-muted dark:text-muted-dark">
            Próximamente nuevos artículos.
          </p>
        )}
      </Section>

      <SocialMedia />
    </Page>
  );
}
