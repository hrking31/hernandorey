import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoRey from "../../assets/Rey.svg";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { MenuNavBar } from "../../Data/Data";
import { isSpanishOnly, useLang } from "../../i18n/lang";

const linkClass = ({ isActive }) =>
  [
    "relative block py-1 text-xl font-black text-brand-strong dark:text-brand",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-brand",
    "after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive ? "after:scale-x-100" : "after:scale-x-0",
  ].join(" ");

export default function NavBar() {
  const { t } = useTranslation();
  const { to } = useLang();
  const { pathname } = useLocation();

  return (
    // En móvil la barra va abajo, al alcance del pulgar; en escritorio, arriba.
    <header className="fixed inset-x-0 bottom-0 z-[1000] border-t border-line bg-surface/90 backdrop-blur dark:border-line-dark dark:bg-surface-dark/90 min-[993px]:top-0 min-[993px]:bottom-auto min-[993px]:border-t-0 min-[993px]:border-b print:hidden">
      <div className="relative flex h-16 items-center justify-between px-3">
        <NavLink
          to={to("/")}
          end
          aria-label={t("nav.home")}
          className="flex items-center gap-1 [@media(hover:hover)]:hover:animate-pulse-scale"
        >
          <img src={LogoRey} alt="" className="h-10 w-auto min-[993px]:h-12" />
          <span className="hidden text-4xl font-black text-ink dark:text-ink-dark min-[993px]:inline">
            HernandoRey
          </span>
        </NavLink>

        {/* En móvil ocupa el espacio entre el logo y los botones, para no tocarlos;
            en escritorio va centrado en la barra. */}
        <nav
          aria-label={t("nav.main")}
          className="flex flex-1 justify-center min-[993px]:absolute min-[993px]:left-1/2 min-[993px]:-translate-x-1/2"
        >
          <ul className="flex items-center gap-6 min-[993px]:gap-8">
            {MenuNavBar.map((text) => (
              <li key={text}>
                <NavLink to={to(`/${text.toLowerCase()}`)} className={linkClass}>
                  {t(`nav.${text.toLowerCase()}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* El panel y el inicio de sesión solo existen en español. */}
          {!isSpanishOnly(pathname) && <LanguageSwitcher />}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
