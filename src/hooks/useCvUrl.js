import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Components/Firebase/Firebase";

// URL pública del CV, guardada desde el panel de administración en config/cv.
export default function useCvUrl() {
  const [cvUrl, setCvUrl] = useState("");

  useEffect(() => {
    let active = true;
    getDoc(doc(db, "config", "cv"))
      .then((snapshot) => {
        if (active && snapshot.exists()) setCvUrl(snapshot.data().url);
      })
      .catch((error) => console.error("Error al obtener el CV:", error));
    return () => {
      active = false;
    };
  }, []);

  return cvUrl;
}
