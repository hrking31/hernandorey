import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import RevealText from "../../Components/RevealText/RevealText";
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
  buttonPrimary,
  buttonSecondary,
} from "../../Components/Layout/Layout";
import useCvUrl from "../../hooks/useCvUrl";
import { useLang } from "../../i18n/lang";

// Las partes en <b> de los textos (es.json) salen en negrita; <name>, en naranja.
const bold = { b: <strong className="font-black" /> };
const intro = { name: <strong className="font-black text-brand-strong dark:text-brand" /> };

// Página "Sobre mí" (/sobre-mi). Ctrl+P aquí imprime el CV completo.
export default function Hola() {
  const { t } = useTranslation();
  const { to } = useLang();
  const cvUrl = useCvUrl();
  const jobs = t("about.jobs", { returnObjects: true });
  const studies = t("about.studies", { returnObjects: true });

  return (
    <Page>
      <Section as="header" className="mb-8 min-[900px]:mb-11">
        <h1 className={pageTitleText}>
          <RevealText>{t("about.title")}</RevealText>{" "}
          {/* Fuera de RevealText: su efecto de entrada también usa transform. */}
          <span aria-hidden="true" className="inline-block origin-[70%_70%] motion-safe:animate-wave">
            👋🏻
          </span>
        </h1>
      </Section>

      {/* En el celular el texto va sin justificar: justificado deja huecos entre palabras. */}
      <Section className="mb-9 flex flex-col gap-6 min-[900px]:text-justify min-[900px]:hyphens-auto">
        <p className={bodyText}>
          <Trans i18nKey="about.intro" components={intro} />
        </p>
        <p className={leadText}>{t("about.lead")}</p>
        <p className={bodyText}>
          <Trans i18nKey="about.body" components={bold} />
        </p>
        <div className="flex flex-wrap gap-3 print:hidden">
          <Link to={to("/proyectos")} className={buttonPrimary}>
            {t("about.projects")}
          </Link>
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="CV-HernandoRey.pdf"
              className={buttonSecondary}
            >
              {t("about.cv")}
            </a>
          )}
        </div>
      </Section>

      <Divider className="mt-2 mb-6 min-[900px]:mb-11" />

      <Section>
        <BigTitle>
          <RevealText>{t("about.who")}</RevealText>
        </BigTitle>
        <div className="mt-4 mb-8 min-[900px]:mt-8 min-[900px]:mb-12 print:mt-4 print:mb-8">
          <Profile />
        </div>
      </Section>

      <Divider className="mb-6 min-[900px]:mb-11" />

      {/* break-inside-avoid: al imprimir, el título no queda solo al final de una hoja. */}
      <Section className="mb-8 min-[900px]:mb-12 print:break-inside-avoid">
        <SubTitle className="mb-6">
          <RevealText>{t("about.experience")}</RevealText>
        </SubTitle>
        <div className="grid gap-5.5">
          {jobs.map((job, j) => (
            <div key={job.role} className="grid gap-2 border-l-[3px] border-brand pl-4.5">
              <p className="text-sm font-extrabold text-muted tabular-nums dark:text-muted-dark">
                {job.when}
              </p>
              <h3 className="text-[1.35rem] leading-[1.2] font-black">{job.role}</h3>
              <ul className={`grid list-disc gap-1.5 pl-4.5 ${bodyText}`}>
                {job.items.map((_, k) => (
                  <li key={k}>
                    <Trans i18nKey={`about.jobs.${j}.items.${k}`} components={bold} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Divider className="mb-6 min-[900px]:mb-11" />

      <Section className="mb-8 min-[900px]:mb-12 print:break-inside-avoid">
        <SubTitle className="mb-5">
          <RevealText>{t("about.education")}</RevealText>
        </SubTitle>
        <ol className="grid gap-3.5">
          {studies.map((study) => (
            <li key={study.title} className="grid gap-0.5">
              <b className="text-[clamp(1rem,1rem+0.3vw,1.2rem)] font-extrabold">{study.title}</b>
              <span className="font-semibold text-muted dark:text-muted-dark">{study.detail}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Divider className="mb-6 min-[900px]:mb-11" />

      <Section className="mb-4 min-[900px]:mb-6 print:break-inside-avoid">
        <SubTitle className="mb-5">
          <RevealText>{t("about.tech")}</RevealText>
        </SubTitle>
        <TechCarousel />
      </Section>

      {/* En pantalla los proyectos viven en /proyectos; aquí quedan solo para
          el CV impreso (Ctrl+P), que los muestra en lista. */}
      <Section className="hidden print:block print:pt-8">
        <BigTitle>{t("projects.title")}</BigTitle>
        <SubTitle className="mt-6 mb-5">{t("nav.proyectos")}</SubTitle>
        <ProjectsSection />
      </Section>

      <Divider className="mt-8 mb-11 min-[900px]:mb-15" />
      <SocialMedia />
    </Page>
  );
}
