import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoRey from "../../assets/Rey.svg";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { MenuNavBar } from "../../Data/Data";
import { isSpanishOnly, useLang } from "../../i18n/lang";

const linkClass = ({ isActive }) =>
  [
    "relative block py-1 text-base font-black text-brand-strong min-[400px]:text-[17px] min-[600px]:text-xl dark:text-brand",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-brand",
    "after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive ? "after:scale-x-100" : "after:scale-x-0",
  ].join(" ");

// Idioma y tema. El panel y el inicio de sesión solo existen en español.
function Controls({ className }) {
  const { pathname } = useLocation();
  return (
    <div className={`items-center gap-2 ${className}`}>
      {!isSpanishOnly(pathname) && <LanguageSwitcher />}
      <ThemeSwitcher />
    </div>
  );
}

export default function NavBar() {
  const { t } = useTranslation();
  const { to } = useLang();

  return (
    <>
      {/* En móvil, idioma y tema van arriba de la página (se van al bajar) y la
          barra de abajo queda solo con el menú, que así cabe holgado. */}
      <Controls className="absolute top-3 right-3 z-[999] flex min-[993px]:hidden print:hidden" />

      {/* En móvil la barra va abajo, al alcance del pulgar; en escritorio, arriba. */}
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

          {/* En móvil ocupa el espacio que deja el logo; en escritorio va centrado en la barra. */}
          <nav
            aria-label={t("nav.main")}
            className="flex flex-1 justify-center min-[993px]:absolute min-[993px]:left-1/2 min-[993px]:-translate-x-1/2"
          >
            <ul className="flex items-center gap-4 min-[400px]:gap-5 min-[600px]:gap-6 min-[993px]:gap-8">
              {MenuNavBar.map(({ key, path }) => (
                <li key={key}>
                  <NavLink to={to(path)} className={linkClass}>
                    {t(`nav.${key}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Controls className="hidden min-[993px]:flex" />
        </div>
      </header>
    </>
  );
}
