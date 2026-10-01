import { Link } from "react-router-dom";
import { LuArrowRight, LuDownload } from "react-icons/lu";
import AnimatedLogo from "../../Components/AnimatedLogo/AnimatedLogo";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import {
  Page,
  Section,
  Divider,
  bodyText,
  subTitleText,
  buttonPrimary,
  buttonSecondary,
} from "../../Components/Layout/Layout";
import useCvUrl from "../../hooks/useCvUrl";
import RevealText from "../../Components/RevealText/RevealText";
import { useLang } from "../../i18n/lang";

export default function Landing() {
  const cvUrl = useCvUrl();
  const { to } = useLang();

  return (
    <Page>
      <Section
        as="header"
        className="mb-8 flex flex-col items-center text-center min-[900px]:mb-11"
      >
        <p className="text-2xl font-bold">
          <RevealText>Hola, soy</RevealText>
        </p>
        <h1 className={`relative ${subTitleText} font-black text-brand-strong after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-[30%] after:-translate-x-1/2 after:bg-brand dark:text-brand`}>
          <RevealText delay={2}>Hernando Rey</RevealText>
        </h1>
      </Section>

      {/* Como antes: en columna con el logo arriba; desde 992 px, texto 70% y logo 30%. */}
      <Section className="flex flex-col items-center gap-2 min-[992px]:flex-row min-[992px]:justify-between">
        <div className="order-first flex w-full flex-col items-center self-start pb-2.5 text-center min-[992px]:order-last min-[992px]:w-[30%]">
          <AnimatedLogo />
          <p className="text-2xl font-bold">
            <RevealText delay={4}>Desarrollador Full Stack</RevealText>
          </p>
          <p className="mt-2 max-w-xs text-[15px] leading-snug font-semibold text-muted dark:text-muted-dark">
            Ingeniero electrónico · React, Node.js y Firebase · IoT con ESP32
          </p>
        </div>

        <div className={`flex w-full flex-col gap-4 text-justify hyphens-auto min-[992px]:w-[70%] min-[992px]:pr-2.5 ${bodyText}`}>
          <p>
            <strong className="font-black">Como desarrollador,</strong> me
            gusta crear soluciones que unen diseño, tecnología y funcionalidad.
          </p>
          <p>
            <strong className="font-black">Resolver problemas,</strong>{" "}
            optimizar procesos y crear soluciones, ya sea a través de sistemas
            automatizados o experiencias digitales.
          </p>
          <p>
            Disfruto todo el proceso de creación, desde la concepción de una
            idea hasta su materialización en un producto real.
          </p>
          <p>
            Adicto al café ☕, amante del ejercicio 🏋🏻💪, cinéfilo empedernido
            🎬🍿 y entusiasta de la domótica 🏠.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 min-[992px]:justify-start">
            <Link to={to("/hola#proyectos")} className={buttonPrimary}>
              Ver proyectos
              <LuArrowRight className="size-4" aria-hidden="true" />
            </Link>
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="CV-HernandoRey.pdf"
                className={buttonSecondary}
              >
                <LuDownload className="size-4" aria-hidden="true" />
                Descargar CV
              </a>
            )}
          </div>
        </div>
      </Section>

      <Divider className="mt-12 mb-11 min-[900px]:mb-15" />
      <SocialMedia />
    </Page>
  );
}
