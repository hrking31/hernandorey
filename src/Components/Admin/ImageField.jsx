import { useId, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { LuImage } from "react-icons/lu";
import { storage } from "../Firebase/storage";
import { uploadName } from "../../utils/storage";
import { formatSize, optimizeImage } from "../../utils/optimizeImage";
import { useToast } from "./feedback";
import { Button, Input } from "./ui";

// Imagen de un proyecto: se optimiza (máximo `maxWidth` px, WebP) y se sube
// directo a Storage (carpeta `folder`), o se pega una URL. Quitarla no borra
// el archivo: eso se hace desde la galería.
export default function ImageField({
  label,
  value,
  onChange,
  folder,
  maxWidth = 1600,
  round = false,
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const id = useId();
  const toast = useToast();

  const handleFile = async (event) => {
    const original = event.target.files?.[0];
    event.target.value = "";
    if (!original) return;

    setUploading(true);
    try {
      const file = await optimizeImage(original, { maxWidth });
      const fileRefInStorage = ref(storage, `${folder}/${uploadName(file)}`);
      await uploadBytes(fileRefInStorage, file, { contentType: file.type });
      onChange(await getDownloadURL(fileRefInStorage));
      const size =
        file === original
          ? formatSize(file.size)
          : `${formatSize(original.size)} → ${formatSize(file.size)}`;
      toast(`Imagen subida (${size}). Recuerda guardar el proyecto.`);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast("No se pudo subir la imagen", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden border border-line bg-surface dark:border-line-dark dark:bg-surface-dark ${
            round ? "size-16 rounded-full" : "h-16 w-24 rounded-lg"
          }`}
        >
          {value ? (
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <LuImage aria-hidden="true" className="size-6 text-muted dark:text-muted-dark" />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Subiendo…" : value ? "Cambiar" : "Subir"}
          </Button>
          {value && (
            <Button variant="ghost" onClick={() => onChange("")} disabled={uploading}>
              Quitar
            </Button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFile}
        />
      </div>
      <Input
        id={id}
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…o pega la URL de una imagen"
        className="h-9 text-sm"
      />
    </div>
  );
}
