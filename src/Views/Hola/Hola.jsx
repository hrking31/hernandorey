import ReyPerfil from "../../assets/ReyPerfil.jpg";
import RevealText from "../../Components/RevealText/RevealText";
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
  bodyText,
  leadText,
  pageTitleText,
} from "../../Components/Layout/Layout";

export default function Hola() {
  return (
    // Mismo margen lateral que la página anterior con MUI (8 px y 22 px).
    <Page className="px-2 min-[900px]:px-[1.4rem]">
      <Section
        as="header"
        className="mb-8 flex items-center justify-end gap-2 min-[900px]:mb-11"
      >
        <h1 className={pageTitleText}>
          <RevealText>Hola</RevealText>{" "}
          {/* Fuera de RevealText: su efecto de entrada también usa transform. */}
          <span aria-hidden="true" className="inline-block origin-[70%_70%] motion-safe:animate-wave">
            👋🏻
          </span>
        </h1>
        <img
          src={ReyPerfil}
          alt=""
          width="64"
          height="64"
          className="size-[62px] rounded-full object-cover min-[600px]:size-[60px] min-[900px]:size-[65px]"
        />
      </Section>

      <Section className="mb-9 flex flex-col gap-6 text-justify hyphens-auto min-[900px]:gap-10">
        <p className={bodyText}>
          Soy tu amigo y colega en el mundo del código...{" "}
          <strong className="font-black text-brand-strong dark:text-brand">
            Hernando Rey
          </strong>
          .
        </p>
        <p className={leadText}>
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

      <Divider className="mt-2 mb-6 min-[900px]:mb-11" />

      <Section className="flex flex-col">
        <BigTitle>
          <RevealText>Yo soy</RevealText>
        </BigTitle>
        <div className="mt-4 mb-8 min-[900px]:mt-8 min-[900px]:mb-12 print:mt-4 print:mb-8">
          <Profile />
        </div>

        <SubTitle className="mb-4 min-[900px]:mb-6">
          <RevealText>Educación</RevealText>
        </SubTitle>
        <ol className="mb-6 flex flex-col gap-2 pl-4 min-[900px]:mb-8">
          {Estudios.map((estudio, index) => (
            <li key={estudio} className={`flex gap-2 ${bodyText}`}>
              <span className="font-bold">{Estudios.length - index}.</span>
              {estudio}
            </li>
          ))}
        </ol>

        <SubTitle className="mb-4 min-[900px]:mb-6 print:mb-0 print:pt-16">
          <RevealText>Tecnologías</RevealText>
        </SubTitle>
        <div className="mt-5 mb-4 min-[900px]:mb-6">
          <TechCarousel />
        </div>
      </Section>

      <Divider className="mt-4 mb-10" />

      <Section id="proyectos" className="scroll-mt-24 print:pt-16">
        <BigTitle>
          <RevealText>¿Qué he hecho?</RevealText>
        </BigTitle>
        <SubTitle className="mt-6 mb-5 min-[900px]:mt-8 min-[900px]:mb-10">
          <RevealText delay={2}>Proyectos</RevealText>
        </SubTitle>
        <ProjectsSection />
      </Section>

      <div className="mt-12 min-[900px]:mt-14 print:hidden">
        <SocialMedia />
      </div>
    </Page>
  );
}
