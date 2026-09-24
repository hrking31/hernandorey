import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { LuBookOpen, LuExternalLink } from "react-icons/lu";
import { buttonPrimary, buttonSecondary } from "../Layout/Layout";

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
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
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

function BrowserBar({ host }) {
  return (
    <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-line bg-card px-3 dark:border-line-dark dark:bg-surface-dark">
      <span className="size-2.5 rounded-full bg-line dark:bg-line-dark" />
      <span className="size-2.5 rounded-full bg-line dark:bg-line-dark" />
      <span className="size-2.5 rounded-full bg-line dark:bg-line-dark" />
      <span className="ml-2 truncate text-xs font-semibold text-muted dark:text-muted-dark">
        {host}
      </span>
    </div>
  );
}

// Captura del proyecto dentro de una barra de navegador, siempre completa
// (nunca se recorta, sea cual sea su proporción). Sin captura, muestra el logo.
function Preview({ project, featured }) {
  const host = hostOf(project.demoUrl);
  const logo = project.logo && (
    <img
      src={project.logo}
      alt=""
      loading="lazy"
      className="size-20 rounded-full object-cover shadow-lg sm:size-24"
    />
  );

  // Destacado: ventana flotante en su proporción real, centrada en su columna.
  if (featured) {
    return (
      <div className="flex items-center justify-center bg-chip p-5 sm:p-8 lg:w-[52%] lg:shrink-0 dark:bg-chip-dark print:hidden">
        <figure className="m-0 w-full overflow-hidden rounded-xl border border-line bg-card shadow-xl shadow-black/15 dark:border-line-dark dark:bg-surface-dark">
          {host && <BrowserBar host={host} />}
          {project.image ? (
            <img
              src={project.image}
              alt={`Captura de ${project.title}`}
              loading="lazy"
              className="h-auto w-full"
            />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center">{logo}</div>
          )}
        </figure>
      </div>
    );
  }

  // Tarjeta normal: espacio fijo 16:10 para que las tarjetas de una fila
  // queden parejas; la captura se ajusta dentro sin recortarse.
  return (
    <div className="flex flex-col bg-chip dark:bg-chip-dark print:hidden">
      {host && <BrowserBar host={host} />}
      <div className="flex aspect-[16/10] items-center justify-center">
        {project.image ? (
          <img
            src={project.image}
            alt={`Captura de ${project.title}`}
            loading="lazy"
            className="size-full object-contain"
          />
        ) : (
          logo
        )}
      </div>
    </div>
  );
}

function Actions({ project, featured }) {
  if (!project.demoUrl && !project.repoUrl && !project.blogUrl) return null;
  return (
    <div className="mt-auto flex flex-wrap gap-3 pt-2 print:hidden">
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

export default function ProjectCard({ project, featured = false, reverse = false }) {
  return (
    <article
      className={`flex overflow-hidden rounded-2xl border border-line bg-card transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:border-line-dark dark:bg-card-dark print:break-inside-avoid print:border-0 print:shadow-none ${
        featured
          ? `flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`
          : "flex-col"
      }`}
    >
      <Preview project={project} featured={featured} />

      <div
        className={`flex flex-1 flex-col gap-4 ${
          featured ? "p-6 lg:p-10" : "p-6"
        } print:p-0 print:py-2`}
      >
        {(featured || project.category) && (
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            {project.client && (
              <span className="flex h-6 items-center gap-1.5 rounded-full bg-brand/10 px-3 text-xs font-extrabold tracking-wide text-brand-strong dark:bg-brand/15 dark:text-brand">
                <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-400" />
                EN PRODUCCIÓN
              </span>
            )}
            {project.client && (
              <span className="flex h-6 items-center rounded-full border border-line px-3 text-xs font-extrabold dark:border-line-dark">
                Cliente real
              </span>
            )}
            {project.category && (
              <span className="text-xs font-bold text-muted dark:text-muted-dark">
                {project.category}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          {project.logo && (
            <img
              src={project.logo}
              alt=""
              loading="lazy"
              className={`${
                featured ? "size-11 lg:size-12" : "size-9"
              } shrink-0 rounded-full object-cover ring-1 ring-line dark:ring-line-dark print:size-6`}
            />
          )}
          <h4
            className={`leading-tight font-black ${
              featured ? "text-2xl lg:text-[2rem]" : "text-xl"
            } print:text-base`}
          >
            {project.title}
          </h4>
        </div>

        {project.description && (
          <p className="text-[15px] leading-relaxed font-medium text-muted dark:text-muted-dark print:text-xs">
            {project.description}
          </p>
        )}

        {featured && project.highlights.length > 0 && (
          <ul className="flex flex-col gap-2.5 print:hidden">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-[15px] leading-snug font-semibold">
                <span aria-hidden="true" className="mt-0.5 font-black text-brand-strong dark:text-brand">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {project.techs.length > 0 && (
          <ul aria-label="Tecnologías" className="flex flex-wrap gap-2 print:gap-1">
            {project.techs.map((tech) => (
              <li
                key={tech}
                className="flex h-7 items-center rounded-lg bg-chip px-2.5 text-[13px] font-bold dark:bg-chip-dark print:h-auto print:bg-transparent print:px-0 print:text-[10px] print:after:content-['·']"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* Al imprimir los botones no sirven: se muestra la dirección. */}
        {project.demoUrl && !project.demoUrl.startsWith("/") && (
          <p className="hidden text-[10px] print:block">{project.demoUrl}</p>
        )}

        <Actions project={project} featured={featured} />
      </div>
    </article>
  );
}
