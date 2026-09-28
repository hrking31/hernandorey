// Piezas de maquetación compartidas por las páginas públicas. Anchos y
// tamaños de texto replican el tema anterior (MUI): 90% del ancho y 70% desde
// 1200 px; títulos y texto que crecen con la pantalla, con cortes en 600 y 900 px.

// Texto corrido (antes body2) y frase destacada en cursiva (antes body1).
export const bodyText =
  "text-[clamp(0.875rem,1rem+0.3vw,1.25rem)] leading-[1.6] font-medium";
export const leadText =
  "text-[clamp(0.875rem,1rem+0.3vw,1.8rem)] leading-[1.4] font-semibold italic";

// Contenedor de página: deja espacio para la barra (abajo en móvil, arriba en
// escritorio). overflow-x-clip recorta lo que las animaciones en 3D sacan por
// los lados, para que la página nunca se deslice hacia los costados.
export function Page({ className = "", children }) {
  return (
    <div
      className={`overflow-x-clip text-ink dark:text-ink-dark pt-[3.2rem] min-[900px]:pt-36 print:pt-16 ${className}`}
    >
      {children}
    </div>
  );
}

// Columna central con el mismo ancho en todas las secciones.
export function Section({ as: Tag = "section", className = "", children, ...props }) {
  return (
    <Tag className={`mx-auto w-[90%] min-[1200px]:w-[70%] ${className}`} {...props}>
      {children}
    </Tag>
  );
}

// Título de página (antes h2): Hola, Blog.
export const pageTitleText =
  "text-[2.4rem] leading-[1.1] font-black min-[601px]:text-[2.8rem] min-[901px]:text-[clamp(2.4rem,5vw,3.9rem)]";

// Título grande de sección (antes h3), alineado a la derecha como en el diseño original.
export function BigTitle({ as: Tag = "h2", className = "", children }) {
  return (
    <Tag
      className={`text-right text-[2rem] leading-[1.15] font-black min-[601px]:text-[2.4rem] min-[901px]:text-[calc(1.3rem+2.7vw)] ${className}`}
    >
      {children}
    </Tag>
  );
}

// Subtítulo de sección (antes h4): Educación, Tecnologías, Proyectos, Artículos.
export const subTitleText =
  "text-[1.8rem] leading-[1.2] min-[601px]:text-[2rem] min-[901px]:text-[calc(1.5rem+1.5vw)]";

export function SubTitle({ as: Tag = "h3", className = "", children }) {
  return <Tag className={`${subTitleText} font-semibold ${className}`}>{children}</Tag>;
}

export function Divider({ className = "" }) {
  return (
    <Section as="div" className={`print:hidden ${className}`}>
      <hr className="m-0 border-0 border-t-[2.5px] border-line dark:border-line-dark" />
    </Section>
  );
}

// Botones de llamada a la acción.
const buttonBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const buttonPrimary = `${buttonBase} bg-brand-strong text-white hover:brightness-110`;

export const buttonSecondary = `${buttonBase} border-[1.5px] border-line text-ink hover:border-brand hover:text-brand-strong dark:border-line-dark dark:text-ink-dark dark:hover:text-brand`;
