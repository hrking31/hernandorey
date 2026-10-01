import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuArrowUp } from "react-icons/lu";
import { scrollToTop } from "../../utils/scroll";

// Botón flotante "↑" para artículos largos: aparece al bajar un poco. En móvil
// va sobre la barra de abajo; en escritorio, en la esquina inferior derecha.
export default function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t("post.top")}
      title={t("post.top")}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 bottom-20 z-[900] flex size-11 items-center justify-center rounded-full border border-line bg-card shadow-lg shadow-black/15 transition-[opacity,translate] duration-300 hover:border-brand hover:text-brand-strong dark:border-line-dark dark:bg-card-dark dark:hover:text-brand min-[993px]:right-6 min-[993px]:bottom-6 print:hidden ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <LuArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
