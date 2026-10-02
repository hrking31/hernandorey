import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore/lite";
import {
  LuArrowDown,
  LuArrowUp,
  LuChevronDown,
  LuPlus,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import { db } from "../Firebase/Firebase";
import { duplicatesOf, toList } from "../../utils/lists";
import { useConfirm, useToast } from "./feedback";
import ImageGallery from "./ImageGallery";
import ProjectForm from "./ProjectForm";
import { Button, Card } from "./ui";

const EMPTY = {
  text: "",
  href: "",
  subtext: "",
  logoUrl: "",
  imageUrl: "",
  techs: "",
  highlights: "",
  repoUrl: "",
  blogUrl: "",
  category: "",
  featured: false,
  client: false,
  textEn: "",
  subtextEn: "",
  highlightsEn: "",
};

// Campos que se guardan en Firestore (las listas como arreglos).
const toFirestore = (p) => ({
  text: p.text?.trim() || "",
  href: p.href?.trim() || "",
  subtext: p.subtext?.trim() || "",
  logoUrl: p.logoUrl || "",
  imageUrl: p.imageUrl || "",
  techs: toList(p.techs),
  highlights: toList(p.highlights, "\n"),
  repoUrl: p.repoUrl?.trim() || "",
  blogUrl: p.blogUrl || "",
  category: p.category || "",
  featured: Boolean(p.featured),
  client: Boolean(p.client),
  // Versión en inglés (/en); vacía = se muestra la de español.
  textEn: p.textEn?.trim() || "",
  subtextEn: p.subtextEn?.trim() || "",
  highlightsEn: toList(p.highlightsEn, "\n"),
});

// Motivo para no guardar, o null si el proyecto se puede guardar.
const invalidReason = (p) => {
  if (!p.text?.trim()) return "El proyecto necesita un nombre";
  const techs = duplicatesOf(p.techs, ",");
  if (techs.length > 0) return `Tecnologías repetidas: ${techs.join(", ")}`;
  const highlights = duplicatesOf(p.highlights, "\n");
  if (highlights.length > 0) return `Logros repetidos: ${highlights.join(", ")}`;
  const highlightsEn = duplicatesOf(p.highlightsEn, "\n");
  if (highlightsEn.length > 0) return `Logros en inglés repetidos: ${highlightsEn.join(", ")}`;
  return null;
};

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);
const imagesOf = (p) => [p.logoUrl, p.imageUrl];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState(null);
  const [saved, setSaved] = useState({});
  const [dirty, setDirty] = useState(() => new Set());
  const [open, setOpen] = useState(() => new Set());
  const [draft, setDraft] = useState(EMPTY);
  const [showNew, setShowNew] = useState(false);
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    getDocs(collection(db, "proyectos"))
      .then((snapshot) => {
        const list = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort(byOrder);
        setProjects(list);
        setSaved(Object.fromEntries(list.map((p) => [p.id, p])));
      })
      .catch((error) => {
        console.error("Error al obtener proyectos:", error);
        toast("No se pudieron cargar los proyectos", "error");
        setProjects([]);
      });
  }, [toast]);

  // Avisa antes de cerrar la pestaña si hay cambios sin guardar.
  useEffect(() => {
    if (dirty.size === 0) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const toggle = (setter, id, on) =>
    setter((prev) => {
      const next = new Set(prev);
      (on ?? !next.has(id)) ? next.add(id) : next.delete(id);
      return next;
    });

  const handleChange = (id, field, value) => {
    setProjects((list) => list.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    toggle(setDirty, id, true);
  };

  // Guarda el orden de todos (0, 1, 2…) sin tocar el resto de campos.
  const persistOrder = async (list) => {
    const batch = writeBatch(db);
    list.forEach((p, index) => batch.update(doc(db, "proyectos", p.id), { order: index }));
    await batch.commit();
  };

  const handleMove = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const list = [...projects];
    [list[index], list[target]] = [list[target], list[index]];
    const ordered = list.map((p, i) => ({ ...p, order: i }));
    setProjects(ordered);
    try {
      await persistOrder(ordered);
    } catch (error) {
      console.error("Error al reordenar:", error);
      toast("No se pudo guardar el nuevo orden", "error");
    }
  };

  const handleSave = async (project) => {
    const invalid = invalidReason(project);
    if (invalid) return toast(invalid, "error");
    setBusy(true);
    try {
      const data = { ...toFirestore(project), order: project.order ?? 0 };
      await updateDoc(doc(db, "proyectos", project.id), data);
      setSaved((prev) => ({ ...prev, [project.id]: { id: project.id, ...data } }));
      toggle(setDirty, project.id, false);
      toast(`"${data.text}" guardado`);
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
      toast("No se pudo guardar el proyecto", "error");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (project) => {
    const ok = await confirm(
      `¿Eliminar el proyecto "${project.text}"?\nSus imágenes quedarán en la galería como "sin usar".`
    );
    if (!ok) return;
    try {
      await deleteDoc(doc(db, "proyectos", project.id));
      const rest = projects.filter((p) => p.id !== project.id).map((p, i) => ({ ...p, order: i }));
      setProjects(rest);
      setSaved((prev) => {
        const next = { ...prev };
        delete next[project.id];
        return next;
      });
      toggle(setDirty, project.id, false);
      await persistOrder(rest);
      toast("Proyecto eliminado");
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      toast("No se pudo eliminar el proyecto", "error");
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const invalid = invalidReason(draft);
    if (invalid) return toast(invalid, "error");
    setBusy(true);
    try {
      const data = { ...toFirestore(draft), order: projects.length };
      const created = await addDoc(collection(db, "proyectos"), data);
      const project = { id: created.id, ...data };
      setProjects((list) => [...list, project]);
      setSaved((prev) => ({ ...prev, [project.id]: project }));
      setDraft(EMPTY);
      setShowNew(false);
      toast(`"${data.text}" agregado`);
    } catch (error) {
      console.error("Error al agregar proyecto:", error);
      toast("No se pudo agregar el proyecto", "error");
    } finally {
      setBusy(false);
    }
  };

  if (projects === null) {
    return <Card><p className="font-semibold">Cargando proyectos…</p></Card>;
  }

  // Imágenes en uso: lo guardado, lo que se está editando y el borrador nuevo.
  const usedUrls = [
    ...Object.values(saved).flatMap(imagesOf),
    ...projects.flatMap(imagesOf),
    ...imagesOf(draft),
  ];

  return (
    <>
      <Card>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">Proyectos</h2>
            <p className="text-sm text-muted dark:text-muted-dark">
              Se muestran en este orden en la página Proyectos.
            </p>
          </div>
          <Button onClick={() => setShowNew((v) => !v)} aria-expanded={showNew}>
            <LuPlus aria-hidden="true" className="size-4" />
            Nuevo proyecto
          </Button>
        </div>

        {showNew && (
          <form
            onSubmit={handleAdd}
            className="mb-6 rounded-xl border-2 border-dashed border-brand/50 p-4 md:p-5"
          >
            <h3 className="mb-4 font-black">Nuevo proyecto</h3>
            <ProjectForm
              values={draft}
              onChange={(field, value) => setDraft((d) => ({ ...d, [field]: value }))}
            />
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowNew(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={busy}>
                <LuPlus aria-hidden="true" className="size-4" />
                Agregar proyecto
              </Button>
            </div>
          </form>
        )}

        <ol className="flex flex-col gap-3">
          {projects.map((project, index) => {
            const isOpen = open.has(project.id);
            const isDirty = dirty.has(project.id);
            return (
              <li
                key={project.id}
                className={`rounded-xl border ${
                  isDirty ? "border-brand" : "border-line dark:border-line-dark"
                }`}
              >
                <div className="flex items-center gap-3 p-3">
                  <span className="w-6 text-center text-sm font-black text-muted dark:text-muted-dark">
                    {index + 1}
                  </span>
                  {project.logoUrl ? (
                    <img src={project.logoUrl} alt="" className="size-9 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="size-9 shrink-0 rounded-full bg-chip dark:bg-chip-dark" />
                  )}
                  <button
                    type="button"
                    onClick={() => toggle(setOpen, project.id)}
                    aria-expanded={isOpen}
                    className="flex min-h-11 flex-1 items-center gap-2 text-left font-black"
                  >
                    <span className="truncate">{project.text || "(sin nombre)"}</span>
                    {project.featured && (
                      <span className="rounded-md bg-brand/10 px-2 py-0.5 text-xs text-brand-strong dark:text-brand">
                        Destacado
                      </span>
                    )}
                    {isDirty && (
                      <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs text-amber-800 dark:text-amber-300">
                        Sin guardar
                      </span>
                    )}
                    <LuChevronDown
                      aria-hidden="true"
                      className={`ml-auto size-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <Button
                    variant="ghost"
                    className="w-10 px-0"
                    onClick={() => handleMove(index, -1)}
                    disabled={index === 0}
                    aria-label={`Subir ${project.text}`}
                  >
                    <LuArrowUp aria-hidden="true" className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-10 px-0"
                    onClick={() => handleMove(index, 1)}
                    disabled={index === projects.length - 1}
                    aria-label={`Bajar ${project.text}`}
                  >
                    <LuArrowDown aria-hidden="true" className="size-4" />
                  </Button>
                </div>

                {isOpen && (
                  <div className="border-t border-line p-4 md:p-5 dark:border-line-dark">
                    <ProjectForm
                      values={project}
                      onChange={(field, value) => handleChange(project.id, field, value)}
                    />
                    <div className="mt-5 flex flex-wrap justify-between gap-3">
                      <Button variant="danger" onClick={() => handleDelete(project)}>
                        <LuTrash2 aria-hidden="true" className="size-4" />
                        Eliminar
                      </Button>
                      <Button onClick={() => handleSave(project)} disabled={busy || !isDirty}>
                        <LuSave aria-hidden="true" className="size-4" />
                        Guardar cambios
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Card>

      <ImageGallery usedUrls={usedUrls} />
    </>
  );
}
