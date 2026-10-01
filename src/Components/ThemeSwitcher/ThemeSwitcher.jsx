import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../Theme/context";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeSwitcher() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("theme.toLight") : t("theme.toDark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
      className="flex size-11 items-center justify-center rounded-full bg-black/10 text-ink transition-colors hover:bg-black/20 dark:bg-white/20 dark:text-ink-dark dark:hover:bg-white/30"
    >
      {isDark ? <LuSun className="size-5" /> : <LuMoon className="size-5" />}
    </button>
  );
}
