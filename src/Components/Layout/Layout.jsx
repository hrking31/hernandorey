// Piezas de maquetación compartidas por las páginas públicas.

// Contenedor de página: deja espacio para la barra (abajo en móvil, arriba en escritorio).
export function Page({ className = "", children }) {
  return (
    <div
      className={`text-ink not-italic dark:text-ink-dark pt-12 lg:pt-36 print:pt-0 ${className}`}
    >
      {children}
    </div>
  );
}

// Columna central con el mismo ancho en todas las secciones.
export function Section({ as: Tag = "section", className = "", children, ...props }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-5xl px-5 md:px-8 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Título grande de sección, alineado a la derecha como en el diseño original.
export function BigTitle({ as: Tag = "h2", className = "", children }) {
  return (
    <Tag
      className={`text-right text-[2rem] leading-tight font-black sm:text-[2.4rem] lg:text-[3.6rem] ${className}`}
    >
      {children}
    </Tag>
  );
}

// Subtítulo de sección (Educación, Tecnologías, Proyectos...).
export function SubTitle({ as: Tag = "h3", className = "", children }) {
  return (
    <Tag
      className={`text-[1.8rem] leading-tight font-semibold sm:text-[2rem] lg:text-[2.6rem] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Divider({ className = "" }) {
  return (
    <Section as="div" className={`print:hidden ${className}`}>
      <hr className="m-0 border-0 border-t-2 border-line dark:border-line-dark" />
    </Section>
  );
}

// Botones de llamada a la acción.
const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const buttonPrimary = `${buttonBase} bg-brand-strong text-white hover:brightness-110`;

export const buttonSecondary = `${buttonBase} border-[1.5px] border-line text-ink hover:border-brand hover:text-brand-strong dark:border-line-dark dark:text-ink-dark dark:hover:text-brand`;
