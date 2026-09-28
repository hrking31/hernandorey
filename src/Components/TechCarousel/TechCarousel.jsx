import { tecnologias } from "../../Data/Data";

function TechChip({ tech }) {
  const Icon = tech.icon;
  return (
    <span className="flex h-9 items-center gap-2 rounded-lg border border-line bg-card px-3 text-sm font-bold whitespace-nowrap dark:border-line-dark dark:bg-card-dark print:h-6 print:gap-1.5 print:rounded-md print:px-2 print:text-[11px]">
      <Icon
        aria-hidden="true"
        className="size-4 shrink-0 print:size-3"
        style={tech.color ? { color: tech.color } : undefined}
      />
      {tech.name}
    </span>
  );
}

export default function TechCarousel() {
  return (
    <>
      {/* En pantalla: cinta en movimiento que se detiene al pasar el mouse. */}
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:hidden print:hidden">
        <ul className="flex w-max animate-marquee gap-3 py-1 group-hover:[animation-play-state:paused]">
          {[...tecnologias, ...tecnologias].map((tech, index) => (
            // La segunda copia solo existe para que la cinta no tenga cortes.
            <li key={index} aria-hidden={index >= tecnologias.length}>
              <TechChip tech={tech} />
            </li>
          ))}
        </ul>
      </div>

      {/* Sin animación (preferencia del sistema) y al imprimir: lista fija. */}
      <ul className="hidden flex-wrap gap-2 motion-reduce:flex print:flex print:justify-center">
        {tecnologias.map((tech) => (
          <li key={tech.name}>
            <TechChip tech={tech} />
          </li>
        ))}
      </ul>
    </>
  );
}
