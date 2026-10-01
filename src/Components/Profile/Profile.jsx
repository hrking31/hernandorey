import { useTranslation } from "react-i18next";
import ReyPerfil from "../../assets/ReyPerfil.jpg";
import useCvUrl from "../../hooks/useCvUrl";

// Qué se ve en pantalla y qué solo al imprimir el CV.
const visibility = {
  ambos: "flex",
  "solo-pantalla": "flex print:hidden",
  "solo-imprimir": "hidden print:flex",
};

function ItemContent({ label, text, cvUrl, t }) {
  if (text === "CV") {
    return (
      <a
        href={cvUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        download="CV-HernandoRey.pdf"
        title={t("about.cvTitle")}
        className="font-bold text-brand-strong underline underline-offset-4 hover:text-brand dark:text-brand"
      >
        {t("about.cv")}
      </a>
    );
  }
  if (label) {
    return (
      <span>
        <b className="font-extrabold">{label}:</b> {text}
      </span>
    );
  }
  if (text.startsWith("http")) {
    return (
      <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[blue] underline underline-offset-2"
      >
        {text}
      </a>
    );
  }
  return <span>{text}</span>;
}

// Los datos de la ficha están en es.json/en.json (about.profile).
export default function Profile() {
  const cvUrl = useCvUrl();
  const { t } = useTranslation();
  const items = t("about.profile", { returnObjects: true });

  return (
    // Medidas del diseño anterior: en columna hasta 763 px; luego foto y datos
    // lado a lado, con la sangría que tenía la versión con MUI.
    <div className="flex flex-col items-center gap-6 min-[763px]:flex-row min-[763px]:justify-between min-[900px]:justify-start min-[991px]:pl-[8.5vw] min-[1200px]:pl-[5.5vw] print:flex-row print:items-center print:gap-2 print:pb-8 print:pl-0">
      <img
        src={ReyPerfil}
        alt="Hernando Rey"
        width="800"
        height="800"
        loading="lazy"
        className="grow-on-scroll order-2 aspect-square w-full rounded-2xl object-cover min-[763px]:order-first min-[763px]:w-1/2 min-[763px]:max-w-[410px] min-[763px]:shrink-0 min-[991px]:w-[47%] min-[991px]:max-w-[367px] min-[1200px]:w-[60%] min-[1200px]:max-w-[370px] print:order-2 print:w-[40%] print:max-w-[200px]"
      />
      <ul className="order-1 flex w-full flex-col gap-1 text-[clamp(0.875rem,1rem+0.3vw,1.25rem)] font-medium min-[763px]:w-[55%] min-[763px]:grow print:w-[60%] print:gap-0 print:py-2">
        {items.map((item) => (
          <li
            key={item.text}
            className={`${visibility[item.mostrarEn]} items-center gap-2.5 px-4 py-2 leading-tight print:py-1`}
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-ink dark:bg-ink-dark"
            />
            <ItemContent label={item.label} text={item.text} cvUrl={cvUrl} t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
