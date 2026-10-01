import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { LuBookOpen, LuExternalLink } from "react-icons/lu";
import { buttonPrimary, buttonSecondary } from "../Layout/Layout";
import { useLang } from "../../i18n/lang";

// Las clases rv-* y data-reveal / data-progress conectan con las animaciones
// de index.css y con el hook useScrollReveal (ver ProjectsSection).

// Dominio que se muestra en la barra; los enlaces internos (/blog) son de este sitio.
function hostOf(url) {
  if (!url) return "";
  try {
    return new URL(url, "https://hernandorey-31.web.app").host;
  } catch {
    return "";
  }
}

// Enlace interno (del propio sitio) o externo, con el mismo aspecto.
function SmartLink({ href, className, children }) {
  const { to } = useLang();
  if (href.startsWith("/")) {
    return (
      <Link to={to(href)} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

// Captura dentro de una ventana de navegador, siempre completa. Los tres
// puntos se "encienden" cuando la tarjeta termina de aparecer.
function Screenshot({ project, framed }) {
  const host = hostOf(project.demoUrl || project.repoUrl);
  const logo = project.logo && (
    <img src={project.logo} alt="" loading="lazy" className="size-20 rounded-full object-cover shadow-lg sm:size-24" />
  );
  const image = project.image && (
    <img
      src={project.image}
      alt={`Captura de ${project.title}`}
      loading="lazy"
      className={`rv-img ${framed ? "size-full object-contain" : "h-auto w-full"}`}
    />
  );

  return (
    <>
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-line bg-card px-3 dark:border-line-dark dark:bg-surface-dark">
        <span className="rv-dot" />
        <span className="rv-dot" />
        <span className="rv-dot" />
        <span className="ml-2 truncate text-xs font-semibold text-muted dark:text-muted-dark">
          {host}
        </span>
      </div>
      {framed || !image ? (
        <div className="flex aspect-[16/10] items-center justify-center bg-stage">{image || logo}</div>
      ) : (
        image
      )}
    </>
  );
}

function Badges({ project }) {
  if (!project.client && !project.category) return null;
  return (
    <div className="rv flex flex-wrap items-center gap-2" style={{ "--k": 0 }}>
      {project.client && (
        <>
          <span className="flex h-6 items-center gap-1.5 rounded-full bg-brand/10 px-3 text-xs font-extrabold tracking-wide text-brand-strong dark:bg-brand/15 dark:text-brand">
            <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-400" />
            EN PRODUCCIÓN
          </span>
          <span className="flex h-6 items-center rounded-full border border-line px-3 text-xs font-extrabold dark:border-line-dark">
            Cliente real
          </span>
        </>
      )}
      {project.category && (
        <span className="text-xs font-bold text-muted dark:text-muted-dark">
          {project.category}
        </span>
      )}
    </div>
  );
}

function Title({ project, featured }) {
  return (
    <div className="rv flex items-center gap-3" style={{ "--k": 1 }}>
      {project.logo && (
        <img
          src={project.logo}
          alt=""
          loading="lazy"
          className={`${
            featured ? "size-11 lg:size-12" : "size-9"
          } shrink-0 rounded-full object-cover ring-1 ring-line dark:ring-line-dark`}
        />
      )}
      <h4
        className={`leading-tight font-black text-balance ${
          featured ? "text-2xl lg:text-[2rem]" : "text-xl"
        }`}
      >
        {project.title}
      </h4>
    </div>
  );
}

function Techs({ techs }) {
  if (techs.length === 0) return null;
  return (
    <ul aria-label="Tecnologías" className="flex flex-wrap gap-2">
      {techs.map((tech, j) => (
        <li
          key={tech}
          style={{ "--j": j }}
          className="rv-chip flex h-7 items-center rounded-lg bg-chip px-2.5 text-[13px] font-bold dark:bg-chip-dark"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Actions({ project, featured, k }) {
  if (!project.demoUrl && !project.repoUrl && !project.blogUrl) return null;
  return (
    <div className="rv mt-auto flex flex-wrap gap-3 pt-2" style={{ "--k": k }}>
      {project.demoUrl && (
        <SmartLink href={project.demoUrl} className={buttonPrimary}>
          <LuExternalLink className="size-4" aria-hidden="true" />
          {featured ? "Ver en vivo" : "Ver demo"}
          <span className="sr-only">: {project.title}</span>
        </SmartLink>
      )}
      {project.repoUrl && (
        <SmartLink href={project.repoUrl} className={buttonSecondary}>
          <FaGithub className="size-4" aria-hidden="true" />
          Código
          <span className="sr-only"> de {project.title}</span>
        </SmartLink>
      )}
      {project.blogUrl && (
        <SmartLink href={project.blogUrl} className={buttonSecondary}>
          <LuBookOpen className="size-4" aria-hidden="true" />
          Leer en el blog
          <span className="sr-only">: {project.title}</span>
        </SmartLink>
      )}
    </div>
  );
}

// Destacado. En celular (diseño D): la captura arriba y un panel con el texto
// que se monta encima y sube al hacer scroll. En PC (diseño C): texto a un
// lado y la captura en 3D al otro, que se endereza mientras bajas.
function FeaturedCard({ project, reverse }) {
  const h = project.highlights.length;
  return (
    <article
      data-reveal
      data-progress
      style={{ viewTransitionName: `p-${project.id}` }}
      className={`reveal-feat flex flex-col lg:grid lg:items-center lg:gap-12 lg:rounded-3xl lg:border lg:border-line lg:bg-card lg:p-10 dark:lg:border-line-dark dark:lg:bg-card-dark ${
        reverse ? "feat-reverse lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1fr_1.25fr]"
      }`}
    >
      <div className={`feat-media ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        <figure className="rv-shot feat-shot m-0 overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-black/25 lg:rounded-xl dark:border-line-dark dark:bg-card-dark">
          <Screenshot project={project} />
        </figure>
      </div>

      <div
        className={`feat-panel relative z-10 mx-3 -mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 shadow-xl shadow-black/15 sm:mx-6 sm:p-7 lg:m-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none dark:border-line-dark dark:bg-card-dark dark:lg:bg-transparent ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Badges project={project} />
        <Title project={project} featured />
        {project.description && (
          <p className="rv text-[15px] leading-relaxed font-medium text-muted dark:text-muted-dark" style={{ "--k": 2 }}>
            {project.description}
          </p>
        )}
        {h > 0 && (
          <ul className="flex flex-col gap-2.5">
            {project.highlights.map((item, j) => (
              <li key={item} className="rv flex gap-2.5 text-[15px] leading-snug font-semibold" style={{ "--k": 3 + j }}>
                <span aria-hidden="true" className="mt-0.5 font-black text-brand-strong dark:text-brand">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
        <Techs techs={project.techs} />
        <Actions project={project} featured k={4 + h} />
      </div>
    </article>
  );
}

// Tarjeta normal (diseño 1): captura en un marco 16:10 y texto debajo.
function Card({ project, index }) {
  return (
    <article
      data-reveal
      style={{ viewTransitionName: `p-${project.id}`, "--i": index % 2 }}
      className="reveal-card relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card hover:shadow-xl hover:shadow-black/10 dark:border-line-dark dark:bg-card-dark"
    >
      <figure className="rv-shot m-0 flex flex-col">
        <Screenshot project={project} framed />
      </figure>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Badges project={project} />
        <Title project={project} />
        {project.description && (
          <p className="rv text-[15px] leading-relaxed font-medium text-muted dark:text-muted-dark" style={{ "--k": 2 }}>
            {project.description}
          </p>
        )}
        <Techs techs={project.techs} />
        <Actions project={project} k={4} />
      </div>
    </article>
  );
}

export default function ProjectCard({ project, featured = false, reverse = false, index = 0 }) {
  return featured ? (
    <FeaturedCard project={project} reverse={reverse} />
  ) : (
    <Card project={project} index={index} />
  );
}
