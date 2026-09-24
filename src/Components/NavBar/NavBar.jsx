import { NavLink } from "react-router-dom";
import LogoRey from "../../assets/Rey.svg";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { MenuNavBar } from "../../Data/Data";

const linkClass = ({ isActive }) =>
  [
    "relative block py-1 text-xl font-black text-brand-strong dark:text-brand",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-brand",
    "after:transition-transform after:duration-300 hover:after:scale-x-100",
    isActive ? "after:scale-x-100" : "after:scale-x-0",
  ].join(" ");

export default function NavBar() {
  return (
    // En móvil la barra va abajo, al alcance del pulgar; en escritorio, arriba.
    <header className="fixed inset-x-0 bottom-0 z-[1000] border-t border-line bg-surface/90 backdrop-blur dark:border-line-dark dark:bg-surface-dark/90 lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b print:hidden">
      <div className="relative flex h-16 items-center justify-between px-3">
        <NavLink
          to="/"
          aria-label="Hernando Rey, ir al inicio"
          className="group flex items-center gap-1"
        >
          <img
            src={LogoRey}
            alt=""
            className="h-10 w-auto lg:h-12 [@media(hover:hover)]:group-hover:animate-pulse-scale"
          />
          <span className="hidden text-4xl font-black text-ink dark:text-ink-dark lg:inline">
            HernandoRey
          </span>
        </NavLink>

        <nav aria-label="Principal" className="absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-8">
            {MenuNavBar.map((text) => (
              <li key={text}>
                <NavLink to={`/${text.toLowerCase()}`} className={linkClass}>
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeSwitcher />
      </div>
    </header>
  );
}
