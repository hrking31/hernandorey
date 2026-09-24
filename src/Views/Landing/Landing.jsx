import { Link } from "react-router-dom";
import { LuArrowRight, LuDownload } from "react-icons/lu";
import AnimatedLogo from "../../Components/AnimatedLogo/AnimatedLogo";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import {
  Page,
  Section,
  Divider,
  buttonPrimary,
  buttonSecondary,
} from "../../Components/Layout/Layout";
import useCvUrl from "../../hooks/useCvUrl";

export default function Landing() {
  const cvUrl = useCvUrl();

  return (
    <Page>
      <Section
        as="header"
        className="mb-10 flex flex-col items-center text-center lg:mb-14"
      >
        <p className="text-2xl font-bold">Hola, soy</p>
        <h1 className="relative pb-2 text-[2.4rem] leading-tight font-black text-brand-strong after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-1/3 after:-translate-x-1/2 after:bg-brand sm:text-5xl dark:text-brand">
          Hernando Rey
        </h1>
      </Section>

      <Section className="grid items-center gap-8 lg:grid-cols-[1fr_18rem] lg:gap-12">
        <div className="flex flex-col items-center text-center lg:order-2">
          <AnimatedLogo />
          <p className="text-2xl font-bold">Desarrollador Full Stack</p>
          <p className="mt-2 max-w-xs text-[15px] leading-snug font-semibold text-muted dark:text-muted-dark">
            Ingeniero electrónico · React, Node.js y Firebase · IoT con ESP32
          </p>
        </div>

        <div className="flex flex-col gap-4 text-justify text-[clamp(0.95rem,0.9rem+0.3vw,1.15rem)] leading-relaxed font-medium hyphens-auto lg:order-1">
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

          <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link to="/hola#proyectos" className={buttonPrimary}>
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

      <Divider className="my-12 lg:mt-14 lg:mb-16" />
      <SocialMedia />
    </Page>
  );
}
