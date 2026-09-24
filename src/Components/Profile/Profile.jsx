import ReyPerfil from "../../assets/ReyPerfil.jpg";
import { YoSoy } from "../../Data/Data";
import useCvUrl from "../../hooks/useCvUrl";

// Qué se ve en pantalla y qué solo al imprimir el CV.
const visibility = {
  ambos: "flex",
  "solo-pantalla": "flex print:hidden",
  "solo-imprimir": "hidden print:flex",
};

function ItemContent({ text, cvUrl }) {
  if (text === "CV") {
    return (
      <a
        href={cvUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        download="CV-HernandoRey.pdf"
        title="¡Aquí tienes mi CV!"
        className="font-bold text-brand-strong underline underline-offset-4 hover:text-brand dark:text-brand"
      >
        Descargar CV
      </a>
    );
  }
  if (text.startsWith("http")) {
    return (
      <a href={text} className="underline underline-offset-4">
        {text}
      </a>
    );
  }
  return <span>{text}</span>;
}

export default function Profile() {
  const cvUrl = useCvUrl();

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12 print:flex-row print:items-start print:gap-4">
      <img
        src={ReyPerfil}
        alt="Hernando Rey"
        width="800"
        height="800"
        loading="lazy"
        className="order-2 aspect-square w-full max-w-xs rounded-2xl object-cover md:order-none md:w-72 print:w-36"
      />
      <ul className="order-1 flex w-full flex-col gap-3 text-[clamp(0.95rem,0.9rem+0.3vw,1.15rem)] font-medium md:order-none print:gap-1 print:text-xs">
        {YoSoy.map((item) => (
          <li
            key={item.text}
            className={`${visibility[item.mostrarEn]} items-center gap-3`}
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-ink dark:bg-ink-dark"
            />
            <ItemContent text={item.text} cvUrl={cvUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
}
