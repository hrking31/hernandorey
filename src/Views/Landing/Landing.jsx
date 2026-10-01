import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { LuArrowRight, LuDownload } from "react-icons/lu";
import AnimatedLogo from "../../Components/AnimatedLogo/AnimatedLogo";
import SocialMedia, { EMAIL } from "../../Components/SocialMedia/SocialMedia";
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

// Las partes en <b> de los textos (es.json) salen en negrita.
const bold = { b: <strong className="font-black" /> };

export default function Landing() {
  const cvUrl = useCvUrl();
  const { to } = useLang();
  const { t } = useTranslation();
  const stats = t("landing.stats", { returnObjects: true });

  return (
    <Page>
      <Section
        as="header"
        className="mb-8 flex flex-col items-center text-center min-[900px]:mb-11"
      >
        <p className="text-2xl font-bold">
          <RevealText>{t("landing.hello")}</RevealText>
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
            <RevealText delay={4}>{t("landing.role")}</RevealText>
          </p>
          <p className="mt-2 max-w-xs text-[15px] leading-snug font-semibold text-muted dark:text-muted-dark">
            {t("landing.tagline")}
          </p>
        </div>

        {/* En el celular el texto va sin justificar: justificado deja huecos entre palabras. */}
        <div className={`flex w-full flex-col gap-4 min-[900px]:text-justify min-[900px]:hyphens-auto min-[992px]:w-[70%] min-[992px]:pr-2.5 ${bodyText}`}>
          {/* Quien lee "Disponible" quiere escribir: el aviso abre el correo. */}
          <a
            href={`mailto:${EMAIL}`}
            title={`${t("landing.contact")}: ${EMAIL}`}
            className="inline-flex items-center gap-2 self-center rounded-full bg-green-600/13 px-3.5 py-1.5 text-sm font-extrabold transition-colors hover:bg-green-600/22 dark:bg-green-400/13 dark:hover:bg-green-400/22 min-[992px]:self-start"
          >
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-green-600 ring-4 ring-green-600/25 dark:bg-green-400 dark:ring-green-400/25" />
            {t("landing.available")}
          </a>
          <p>
            <Trans i18nKey="landing.what" components={bold} />
          </p>
          <p>
            <Trans i18nKey="landing.production" components={bold} />
          </p>
          {/* Sin justificar: las etiquetas cortas de dos líneas quedarían con huecos. */}
          <ul className="grid grid-cols-3 gap-2.5 text-left">
            {stats.map(({ value, label }) => (
              <li key={label}>
                <Link
                  to={to("/proyectos")}
                  className="block h-full rounded-[14px] border border-line bg-card p-3 transition-colors hover:border-brand dark:border-line-dark dark:bg-card-dark dark:hover:border-brand"
                >
                  <span className="block text-[1.7rem] leading-[1.1] font-black text-brand-strong tabular-nums dark:text-brand">
                    {value}
                  </span>
                  <span className="block text-[13px] leading-[1.3] font-bold text-muted dark:text-muted-dark">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p>{t("landing.hobbies")}</p>

          <div className="mt-2 flex flex-wrap justify-center gap-3 min-[992px]:justify-start">
            <Link to={to("/proyectos")} className={buttonPrimary}>
              {t("landing.projects")}
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
                {t("landing.cv")}
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
