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
    // Medidas del diseño anterior: en columna hasta 763 px; luego foto y datos
    // lado a lado, con la sangría que tenía la versión con MUI.
    <div className="flex flex-col items-center gap-6 min-[763px]:flex-row min-[763px]:justify-between min-[900px]:justify-start min-[991px]:pl-[8.5vw] min-[1200px]:pl-[5.5vw] print:flex-row print:items-start print:gap-2 print:pl-0">
      <img
        src={ReyPerfil}
        alt="Hernando Rey"
        width="800"
        height="800"
        loading="lazy"
        className="order-2 aspect-square w-full rounded-2xl object-cover min-[763px]:order-first min-[763px]:w-[45%] min-[763px]:max-w-[300px] min-[763px]:shrink-0 min-[900px]:w-[40%] min-[900px]:max-w-[380px] min-[1200px]:w-[60%] min-[1200px]:max-w-[370px] print:w-36"
      />
      <ul className="order-1 flex w-full flex-col gap-1 text-[clamp(0.875rem,1rem+0.3vw,1.25rem)] font-medium min-[763px]:w-[55%] min-[763px]:grow print:gap-1 print:text-xs">
        {YoSoy.map((item) => (
          <li
            key={item.text}
            className={`${visibility[item.mostrarEn]} items-center gap-2.5 px-4 py-2 leading-tight print:p-0`}
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
