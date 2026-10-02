import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTranslation } from "react-i18next";
import { inLang, loadProjects } from "../../utils/projects";
import { useLang } from "../../i18n/lang";
import useScrollReveal from "../../hooks/useScrollReveal";
import { tilt, untilt } from "../../utils/tilt";
import ProjectCard from "./ProjectCard";

// Valor interno del filtro "todos"; el texto visible sale de projects.all.
const ALL = "*";

function Skeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2" aria-hidden="true">
      {[0, 1].map((n) => (
        <div
          key={n}
          className="h-96 animate-pulse rounded-2xl bg-chip dark:bg-chip-dark"
        />
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState(ALL);
  const rootRef = useRef(null);
  const { t } = useTranslation();
  const { lang } = useLang();

  // Se vuelve a preparar cada vez que cambian las tarjetas visibles.
  useScrollReveal(rootRef, [status, filter]);

  // Al filtrar, cada tarjeta se desliza a su nueva posición (View Transitions).
  const changeFilter = (category) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return setFilter(category);
    document.startViewTransition(() => flushSync(() => setFilter(category)));
  };

  useEffect(() => {
    loadProjects()
      .then((list) => {
        setProjects(list);
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Error al obtener proyectos:", error);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <Skeleton />;
  if (status === "error") {
    return (
      <p className="font-semibold text-muted dark:text-muted-dark">
        {t("projects.error")}
      </p>
    );
  }

  // Textos en el idioma de la página (en /en, los campos en inglés del panel).
  const shown = projects.map((p) => inLang(p, lang));
  const categories = [...new Set(shown.map((p) => p.category).filter(Boolean))];
  const visible = shown.filter((p) => filter === ALL || p.category === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <>
      <div ref={rootRef} className="flex flex-col gap-12 lg:gap-16 print:hidden">
        {categories.length > 1 && (
          <div
            role="group"
            aria-label={t("projects.filter")}
            className="grid grid-cols-2 gap-2 min-[601px]:flex min-[601px]:flex-wrap min-[601px]:gap-2.5"
          >
            {[ALL, ...categories].map((category) => {
              const count =
                category === ALL
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => changeFilter(category)}
                  className={`flex h-9 items-center justify-center gap-1.5 rounded-full border-[1.5px] px-3 text-[13px] font-bold transition odd:last:col-span-2 min-[601px]:h-11 min-[601px]:gap-2 min-[601px]:px-4 min-[601px]:text-[15px] ${
                    active
                      ? "border-ink bg-ink text-surface dark:border-ink-dark dark:bg-ink-dark dark:text-surface-dark"
                      : "border-line hover:border-brand dark:border-line-dark"
                  }`}
                >
                  {category === ALL
                    ? t("projects.all")
                    : t(`categories.${category}`, { defaultValue: category })}
                  <span className="text-[12px] font-semibold opacity-70 min-[601px]:text-[13px]">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {featured.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured
            reverse={index % 2 === 1}
          />
        ))}

        {rest.length > 0 && (
          <div
            onPointerMove={tilt}
            onPointerOut={untilt}
            className="grid gap-8 md:grid-cols-2"
          >
            {rest.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>

      <PrintList projects={shown} />
    </>
  );
}

// En el CV impreso los proyectos van en lista, como en la versión anterior:
// logo, título y descripción, separados por una línea. Cada fila enlaza a la
// página del proyecto.
function PrintList({ projects }) {
  return (
    <ul className="mx-auto hidden w-[90%] min-[900px]:w-[88%] print:mb-12 print:block">
      {projects.map((project) => {
        const external = project.demoUrl && !project.demoUrl.startsWith("/");
        return (
          <li key={project.id} className="break-inside-avoid border-b border-black/12">
            <a
              href={project.demoUrl || undefined}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="flex gap-9 py-2"
            >
              <span className="shrink-0 pt-1 pl-4">
                {project.logo ? (
                  <img
                    src={project.logo}
                    alt=""
                    className="size-[45px] rounded-full object-cover min-[900px]:size-[55px]"
                  />
                ) : (
                  <span className="flex size-[45px] items-center justify-center rounded-full bg-[#bdbdbd] text-xl text-white min-[900px]:size-[55px]">
                    {project.title.charAt(0)}
                  </span>
                )}
              </span>
              <span className="flex flex-col text-left">
                <span className="text-base font-bold">{project.title}</span>
                {project.description && (
                  <span className="text-justify text-sm break-words hyphens-auto text-black/60">
                    {project.description}
                  </span>
                )}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
