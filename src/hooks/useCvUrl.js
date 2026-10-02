import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../Components/Firebase/Firebase";
import { safeUrl } from "../utils/safeUrl";
import { useLang } from "../i18n/lang";

// URLs públicas de los dos CV, guardadas desde el panel en config/cv:
// url (español) y urlEn (inglés).
export function useCvUrls() {
  const [urls, setUrls] = useState({ es: "", en: "" });

  useEffect(() => {
    let active = true;
    getDoc(doc(db, "config", "cv"))
      .then((snapshot) => {
        if (!active || !snapshot.exists()) return;
        const data = snapshot.data();
        setUrls({ es: safeUrl(data.url), en: safeUrl(data.urlEn) });
      })
      .catch((error) => console.error("Error al obtener el CV:", error));
    return () => {
      active = false;
    };
  }, []);

  return urls;
}

// El CV del idioma de la página. Si aún no hay CV en inglés, se ofrece el de
// español para que el botón "Descargar CV" nunca quede vacío.
export default function useCvUrl() {
  const { lang } = useLang();
  const urls = useCvUrls();
  return (lang === "en" && urls.en) || urls.es;
}
