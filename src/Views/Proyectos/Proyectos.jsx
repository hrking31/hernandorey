import { useTranslation } from "react-i18next";
import RevealText from "../../Components/RevealText/RevealText";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import ProjectsSection from "../../Components/Projects/ProjectsSection";
import { Page, Section, Divider, bodyText, pageTitleText } from "../../Components/Layout/Layout";

// Los proyectos en su propia página (antes iban al final de Hola).
export default function Proyectos() {
  const { t } = useTranslation();

  return (
    <Page>
      <Section as="header" className="mb-8 min-[900px]:mb-11">
        <h1 className={pageTitleText}>
          <RevealText>{t("projects.title")}</RevealText>
        </h1>
        <p className={`mt-3 font-semibold text-muted dark:text-muted-dark ${bodyText}`}>
          {t("projects.intro")}
        </p>
      </Section>

      <Section>
        <ProjectsSection />
      </Section>

      <Divider className="mt-12 mb-11 min-[900px]:mb-15" />
      <SocialMedia />
    </Page>
  );
}
