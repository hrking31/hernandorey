import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Firebase/Firebase";
import { toList } from "../../utils/lists";
import { safeUrl } from "../../utils/safeUrl";
import useScrollReveal from "../../hooks/useScrollReveal";
import { tilt, untilt } from "../../utils/tilt";
import ProjectCard from "./ProjectCard";

const ALL = "Todos";

// Traduce un documento de Firestore (colección "proyectos") al formato de la tarjeta.
function toProject(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    order: data.order ?? 0,
    title: data.text ?? "",
    description: data.subtext ?? "",
    logo: safeUrl(data.logoUrl),
    image: safeUrl(data.imageUrl),
    demoUrl: safeUrl(data.href),
    repoUrl: safeUrl(data.repoUrl),
    blogUrl: safeUrl(data.blogUrl),
    category: data.category ?? "",
    techs: toList(data.techs),
    highlights: toList(data.highlights, "\n"),
    featured: Boolean(data.featured),
    client: Boolean(data.client),
  };
}

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

  // Se vuelve a preparar cada vez que cambian las tarjetas visibles.
  useScrollReveal(rootRef, [status, filter]);

  // Al filtrar, cada tarjeta se desliza a su nueva posición (View Transitions).
  const changeFilter = (category) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return setFilter(category);
    document.startViewTransition(() => flushSync(() => setFilter(category)));
  };

  useEffect(() => {
    getDocs(collection(db, "proyectos"))
      .then((snapshot) => {
        setProjects(snapshot.docs.map(toProject).sort((a, b) => a.order - b.order));
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
        No se pudieron cargar los proyectos. Intenta recargar la página.
      </p>
    );
  }

  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
  const visible = projects.filter((p) => filter === ALL || p.category === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <>
      <div ref={rootRef} className="flex flex-col gap-12 lg:gap-16 print:hidden">
        {categories.length > 1 && (
          <div
            role="group"
            aria-label="Filtrar proyectos por categoría"
            className="flex flex-wrap gap-2.5"
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
                  className={`flex h-11 items-center gap-2 rounded-full border-[1.5px] px-4 text-[15px] font-bold transition ${
                    active
                      ? "border-ink bg-ink text-surface dark:border-ink-dark dark:bg-ink-dark dark:text-surface-dark"
                      : "border-line hover:border-brand dark:border-line-dark"
                  }`}
                >
                  {category}
                  <span className="text-[13px] font-semibold opacity-70">{count}</span>
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

      <PrintList projects={projects} />
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
