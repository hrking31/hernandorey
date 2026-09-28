import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore/lite";
import { LuFileText, LuUpload } from "react-icons/lu";
import { db } from "../Firebase/Firebase";
import { storage } from "../Firebase/storage";
import useCvUrl from "../../hooks/useCvUrl";
import { useToast } from "./feedback";
import { Button, Card } from "./ui";

// Reemplaza el PDF del CV. El botón "Descargar CV" del sitio lee la URL de config/cv.
export default function CvUpload() {
  const currentUrl = useCvUrl();
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const cvUrl = uploadedUrl || currentUrl;

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const cvRef = ref(storage, "CV-HernandoRey.pdf");
      await uploadBytes(cvRef, file, {
        contentType: "application/pdf",
        contentDisposition: "attachment; filename=CV-HernandoRey.pdf",
      });
      const url = await getDownloadURL(cvRef);
      await setDoc(doc(db, "config", "cv"), { url, updatedAt: new Date().toISOString() });
      setUploadedUrl(url);
      setFile(null);
      toast("CV actualizado");
    } catch (error) {
      console.error("Error al subir el CV:", error);
      toast("No se pudo subir el CV", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <h2 className="mb-1 text-xl font-black">CV</h2>
      <p className="mb-4 text-sm text-muted dark:text-muted-dark">
        El PDF que se descarga desde Inicio y desde Hola.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {cvUrl && (
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold text-brand-strong underline underline-offset-4 dark:text-brand"
          >
            <LuFileText aria-hidden="true" className="size-4" />
            Ver CV actual
          </a>
        )}
        <label className="text-sm font-bold">
          <span className="sr-only">Elegir PDF</span>
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
    </Card>
  );
}
