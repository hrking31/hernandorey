import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Components/Firebase/Firebase";
import { toList } from "./lists";
import { safeUrl } from "./safeUrl";

// Traduce un documento de Firestore (colección "proyectos") al formato de la tarjeta.
function toProject(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    order: data.order ?? 0,
    title: data.text ?? "",
    description: data.subtext ?? "",
    logo: safeUrl(data.logoUrl),
    image: safeUrl(data.imageUrl),
    demoUrl: safeUrl(data.href),
    repoUrl: safeUrl(data.repoUrl),
    blogUrl: safeUrl(data.blogUrl),
    category: data.category ?? "",
    techs: toList(data.techs),
    highlights: toList(data.highlights, "\n"),
    featured: Boolean(data.featured),
    client: Boolean(data.client),
    en: {
      title: data.textEn ?? "",
      description: data.subtextEn ?? "",
      highlights: toList(data.highlightsEn, "\n"),
    },
  };
}

// El proyecto con los textos del idioma pedido. En inglés usa los campos *En
// del panel; los que estén vacíos se quedan en español.
export function inLang(project, lang) {
  if (lang !== "en") return project;
  const { en } = project;
  return {
    ...project,
    title: en.title || project.title,
    description: en.description || project.description,
    highlights: en.highlights.length > 0 ? en.highlights : project.highlights,
  };
}

// Todos los proyectos, en el orden elegido en el panel. Los usan la página de
// proyectos y el final de cada artículo (proyecto relacionado).
export async function loadProjects() {
  const snapshot = await getDocs(collection(db, "proyectos"));
  return snapshot.docs.map(toProject).sort((a, b) => a.order - b.order);
}
