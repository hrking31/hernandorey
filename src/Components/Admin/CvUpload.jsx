import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore/lite";
import { LuFileText, LuUpload } from "react-icons/lu";
import { db } from "../Firebase/Firebase";
import { storage } from "../Firebase/storage";
import { useCvUrls } from "../../hooks/useCvUrl";
import { useToast } from "./feedback";
import { Button, Card } from "./ui";

// Los dos CV. El botón "Descargar CV" del sitio baja el del idioma de la
// página (config/cv: url y urlEn). Cada archivo tiene su regla en storage.rules.
const SLOTS = [
  {
    lang: "es",
    title: "CV en español",
    hint: "",
    file: "CV-HernandoRey.pdf",
    field: "url",
    name: "CV",
  },
  {
    lang: "en",
    title: "CV en inglés (resume)",
    hint: "Mientras no lo subas, en inglés se descarga el de español.",
    file: "RESUME-HernandoRey.pdf",
    field: "urlEn",
    name: "RESUME",
  },
];

const viewClass =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-bold text-brand-strong underline underline-offset-4 dark:text-brand";

function CvSlot({ slot, currentUrl }) {
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const cvUrl = uploadedUrl || currentUrl;

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const cvRef = ref(storage, slot.file);
      await uploadBytes(cvRef, file, {
        contentType: "application/pdf",
        contentDisposition: `attachment; filename=${slot.file}`,
      });
      const url = await getDownloadURL(cvRef);
      // merge: guarda solo este enlace sin borrar el del otro idioma.
      await setDoc(
        doc(db, "config", "cv"),
        { [slot.field]: url, updatedAt: new Date().toISOString() },
        { merge: true }
      );
      setUploadedUrl(url);
      setFile(null);
      toast(`${slot.name} actualizado`);
    } catch (error) {
      console.error(`Error al subir el ${slot.name}:`, error);
      toast(`No se pudo subir el ${slot.name}`, "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h3 className={`font-black ${slot.hint ? "" : "mb-3"}`}>{slot.title}</h3>
      {slot.hint && <p className="mb-3 text-sm text-muted dark:text-muted-dark">{slot.hint}</p>}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mismo botón en los dos; si ese CV aún no existe, avisa en vez de abrir. */}
        {cvUrl ? (
          <a href={cvUrl} target="_blank" rel="noopener noreferrer" className={viewClass}>
            <LuFileText aria-hidden="true" className="size-4" />
            Ver actual
          </a>
        ) : (
          <button type="button" onClick={() => toast(`No hay ${slot.name} cargado`, "error")} className={viewClass}>
            <LuFileText aria-hidden="true" className="size-4" />
            Ver actual
          </button>
        )}
        <label className="text-sm font-bold">
          <span className="sr-only">Elegir PDF: {slot.title}</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm file:mr-3 file:h-10 file:cursor-pointer file:rounded-lg file:border-0 file:bg-chip file:px-4 file:font-bold dark:file:bg-chip-dark"
          />
        </label>
        <Button onClick={handleUpload} disabled={!file || uploading}>
          <LuUpload aria-hidden="true" className="size-4" />
          {uploading ? "Subiendo…" : "Subir PDF"}
        </Button>
      </div>
    </div>
  );
}

export default function CvUpload() {
  const urls = useCvUrls();

  return (
    <Card>
      <h2 className="mb-4 text-xl font-black">CV Hernando Rey</h2>
      <div className="grid gap-6">
        {SLOTS.map((slot) => (
          <CvSlot key={slot.lang} slot={slot} currentUrl={urls[slot.lang]} />
        ))}
      </div>
    </Card>
  );
}
