import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { toList } from "../../utils/lists";
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
    logo: data.logoUrl ?? "",
    image: data.imageUrl ?? "",
    demoUrl: data.href ?? "",
    repoUrl: data.repoUrl ?? "",
    blogUrl: data.blogUrl ?? "",
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
    <div ref={rootRef} className="flex flex-col gap-12 lg:gap-16">
      {categories.length > 1 && (
        <div
          role="group"
          aria-label="Filtrar proyectos por categoría"
          className="flex flex-wrap gap-2.5 print:hidden"
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
          className="grid gap-8 md:grid-cols-2 print:grid-cols-1 print:gap-2"
        >
          {rest.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
