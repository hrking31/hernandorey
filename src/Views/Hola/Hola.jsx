import ReyPerfil from "../../assets/ReyPerfil.jpg";
import { Estudios } from "../../Data/Data";
import Profile from "../../Components/Profile/Profile";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import TechCarousel from "../../Components/TechCarousel/TechCarousel";
import ProjectsSection from "../../Components/Projects/ProjectsSection";
import {
  Page,
  Section,
  BigTitle,
  SubTitle,
  Divider,
} from "../../Components/Layout/Layout";

const bodyText =
  "text-[clamp(0.95rem,0.9rem+0.3vw,1.2rem)] leading-relaxed font-medium";

export default function Hola() {
  return (
    <Page>
      <Section
        as="header"
        className="mb-8 flex items-center justify-end gap-3 lg:mb-11"
      >
        <h1 className="text-[2.4rem] leading-none font-black lg:text-[3.9rem]">
          Hola 👋🏻
        </h1>
        <img
          src={ReyPerfil}
          alt=""
          width="64"
          height="64"
          className="size-16 rounded-full object-cover"
        />
      </Section>

      <Section className="mb-10 flex flex-col gap-6 text-justify hyphens-auto lg:mb-14">
        <p className={bodyText}>
          Soy tu amigo y colega en el mundo del código...{" "}
          <strong className="font-black text-brand-strong dark:text-brand">
            Hernando Rey
          </strong>
          .
        </p>
        <p className="text-[clamp(1rem,0.95rem+0.3vw,1.3rem)] leading-snug font-semibold italic">
          Ingeniero electrónico y desarrollador web, combinando hardware y
          software para crear soluciones únicas.
        </p>
        <p className={bodyText}>
          <strong className="font-black">Como Desarrollador Full Stack,</strong>{" "}
          combino mi pasión por la programación con un compromiso constante de
          aprendizaje para dominar tecnologías emergentes. Tengo experiencia en
          todo el ciclo de desarrollo de aplicaciones web, desde la creación de
          interfaces intuitivas con React en el frontend hasta la construcción
          de APIs robustas con Node.js y Express en el backend. Me especializo
          en diseñar arquitecturas escalables, integrando bases de datos SQL y
          NoSQL (como PostgreSQL y MongoDB) y aprovechando servicios en la nube
          para optimizar el rendimiento y la eficiencia. Cada línea de código
          que escribo no solo resuelve problemas, sino que también busca
          ofrecer experiencias de usuario excepcionales y soluciones
          tecnológicas innovadoras.
        </p>
      </Section>

      <Divider className="mb-10 lg:mb-14" />

      <Section className="flex flex-col">
        <BigTitle>Yo soy</BigTitle>
        <div className="mt-8 mb-12 lg:mt-10 lg:mb-16 print:mt-4 print:mb-6">
          <Profile />
        </div>

        <SubTitle className="mb-4">Educación</SubTitle>
        <ol className="mb-12 flex flex-col gap-3 lg:mb-16">
          {Estudios.map((estudio, index) => (
            <li key={estudio} className={`flex gap-2 ${bodyText}`}>
              <span className="font-bold">{Estudios.length - index}.</span>
              {estudio}
            </li>
          ))}
        </ol>

        <SubTitle className="mb-6 print:pt-8">Tecnologías</SubTitle>
        <TechCarousel />
      </Section>

      <Divider className="my-12 lg:my-16" />

      <Section id="proyectos" className="scroll-mt-24 print:pt-8">
        <BigTitle>¿Qué he hecho?</BigTitle>
        <SubTitle className="mt-6 mb-8 lg:mt-8 lg:mb-10">Proyectos</SubTitle>
        <ProjectsSection />
      </Section>

      <div className="mt-16 lg:mt-20">
        <SocialMedia />
      </div>
    </Page>
  );
}
