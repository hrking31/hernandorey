import { useCallback, useEffect, useState } from "react";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { LuRefreshCw, LuTrash2 } from "react-icons/lu";
import { storage } from "../Firebase/storage";
import { storagePath } from "../../utils/storage";
import { useConfirm, useToast } from "./feedback";
import { Button, Card } from "./ui";

const FOLDERS = ["logos", "capturas"];

// Imágenes subidas a Storage. Marca las que usa algún proyecto y solo deja
// borrar las que no usa ninguno, para no dejar tarjetas sin imagen.
export default function ImageGallery({ usedUrls }) {
  const [images, setImages] = useState(null);
  const toast = useToast();
  const confirm = useConfirm();

  const load = useCallback(async () => {
    try {
      const lists = await Promise.all(
        FOLDERS.map(async (folder) => {
          const result = await listAll(ref(storage, folder));
          return Promise.all(
            result.items.map(async (item) => ({
              folder,
              path: item.fullPath,
              name: item.name,
              url: await getDownloadURL(item),
            }))
          );
        })
      );
      setImages(lists.flat());
    } catch (error) {
      console.error("Error al listar imágenes:", error);
      toast("No se pudieron cargar las imágenes", "error");
      setImages([]);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const used = new Set(usedUrls.map(storagePath).filter(Boolean));

  const handleDelete = async (image) => {
    const ok = await confirm(`¿Eliminar "${image.name}" de Firebase Storage?\nNo se puede deshacer.`);
    if (!ok) return;
    try {
      await deleteObject(ref(storage, image.path));
      setImages((list) => list.filter((i) => i.path !== image.path));
      toast("Imagen eliminada");
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
      toast("No se pudo eliminar la imagen", "error");
    }
  };

  const unused = images?.filter((i) => !used.has(i.path)).length ?? 0;

  return (
    <Card>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black">Imágenes</h2>
          <p className="text-sm text-muted dark:text-muted-dark">
            {images === null
              ? "Cargando…"
              : `${images.length} en total · ${unused} sin usar`}
          </p>
        </div>
        <Button variant="secondary" onClick={load}>
          <LuRefreshCw aria-hidden="true" className="size-4" />
          Actualizar
        </Button>
      </div>

      {images?.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {images.map((image) => {
            const inUse = used.has(image.path);
            return (
              <li
                key={image.path}
                className="flex flex-col overflow-hidden rounded-xl border border-line dark:border-line-dark"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  loading="lazy"
                  className="h-24 w-full bg-surface object-contain dark:bg-surface-dark"
                />
                <div className="flex items-center justify-between gap-2 p-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-extrabold ${
                      inUse
                        ? "bg-green-700/10 text-green-800 dark:text-green-400"
                        : "bg-chip text-muted dark:bg-chip-dark dark:text-muted-dark"
                    }`}
                  >
                    {inUse ? "En uso" : "Sin usar"}
                  </span>
                  {!inUse && (
                    <button
                      type="button"
                      onClick={() => handleDelete(image)}
                      aria-label={`Eliminar ${image.name}`}
                      title="Eliminar"
                      className="flex size-9 items-center justify-center rounded-lg text-red-700 hover:bg-red-700/10 dark:text-red-400"
                    >
                      <LuTrash2 aria-hidden="true" className="size-4" />
                    </button>
                  )}
                </div>
                <span className="truncate px-2 pb-2 text-[11px] text-muted dark:text-muted-dark">
                  {image.folder}/
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
