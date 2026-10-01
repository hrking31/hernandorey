import { useTranslation } from "react-i18next";
import { tecnologias } from "../../Data/Data";

const daily = tecnologias.filter((tech) => tech.group === "diario");
const other = tecnologias.filter((tech) => tech.group === "otras");

// ghost: borde punteado y sin color, para las que ningún proyecto muestra aún.
// Al imprimir el borde va más oscuro: el gris de pantalla casi no sale en papel.
function TechChip({ tech, ghost = false }) {
  const Icon = tech.icon;
  return (
    <span
      className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-bold whitespace-nowrap print:h-6 print:gap-1.5 print:rounded-md print:px-2 print:text-[11px] ${
        ghost
          ? "border-dashed border-line text-muted dark:border-line-dark dark:text-muted-dark print:border-black/45"
          : "border-line bg-card dark:border-line-dark dark:bg-card-dark"
      }`}
    >
      <Icon
        aria-hidden="true"
        className="size-4 shrink-0 print:size-3"
        style={tech.color && !ghost ? { color: tech.color } : undefined}
      />
      {tech.name}
    </span>
  );
}

function GroupTitle({ title, note, className = "" }) {
  return (
    <div className={className}>
      <p className="text-[1.05rem] font-extrabold">{title}</p>
      <p className="mb-3 text-sm font-semibold text-muted dark:text-muted-dark">{note}</p>
    </div>
  );
}

export default function TechCarousel() {
  const { t } = useTranslation();

  return (
    <>
      <GroupTitle title={t("about.daily")} note={t("about.dailyNote")} />

      {/* En pantalla: cinta en movimiento que se detiene al pasar el mouse. */}
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:hidden print:hidden">
        <ul className="flex w-max animate-marquee gap-3 py-1 group-hover:[animation-play-state:paused]">
          {[...daily, ...daily].map((tech, index) => (
            // La segunda copia solo existe para que la cinta no tenga cortes.
            <li key={index} aria-hidden={index >= daily.length}>
              <TechChip tech={tech} />
            </li>
          ))}
        </ul>
      </div>

      {/* Sin animación (preferencia del sistema) y al imprimir: lista fija. */}
      <ul className="hidden flex-wrap gap-2 motion-reduce:flex print:flex print:justify-center">
        {daily.map((tech) => (
          <li key={tech.name}>
            <TechChip tech={tech} />
          </li>
        ))}
      </ul>

      <GroupTitle title={t("about.other")} note={t("about.otherNote")} className="mt-7" />
      <ul className="flex flex-wrap gap-2 print:justify-center">
        {other.map((tech) => (
          <li key={tech.name}>
            <TechChip tech={tech} ghost />
          </li>
        ))}
      </ul>
    </>
  );
}
