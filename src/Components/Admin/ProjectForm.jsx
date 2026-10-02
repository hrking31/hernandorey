import { posts } from "../../content/blog";
import { duplicatesOf } from "../../utils/lists";
import ImageField from "./ImageField";
import { Checkbox, Field, Input, Select, TextArea } from "./ui";

const CATEGORIAS = ["Web", "IoT y Hardware", "Herramientas"];

// Las listas se guardan como arreglo en Firestore y se editan como texto.
const asText = (value, separator) =>
  Array.isArray(value) ? value.join(separator) : value ?? "";

const repeatedWarning = (value, separator) => {
  const repeated = duplicatesOf(value, separator);
  return repeated.length > 0 ? `Repetido: ${repeated.join(", ")}` : null;
};

// Todos los campos de un proyecto. Se usa al crear y al editar.
export default function ProjectForm({ values, onChange }) {
  const bind = (name) => ({
    value: values[name] ?? "",
    onChange: (e) => onChange(name, e.target.value),
  });

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Nombre *">
        <Input {...bind("text")} required />
      </Field>
      <Field label="Enlace (demo o sitio en vivo)" hint="Externo (https://…) o interno (/blog)">
        <Input {...bind("href")} />
      </Field>

      <Field label="Descripción" className="md:col-span-2">
        <TextArea {...bind("subtext")} rows={3} />
      </Field>

      <ImageField
        label="Logo"
        folder="logos"
        maxWidth={256}
        round
        value={values.logoUrl ?? ""}
        onChange={(url) => onChange("logoUrl", url)}
      />
      <ImageField
        label="Captura"
        folder="capturas"
        value={values.imageUrl ?? ""}
        onChange={(url) => onChange("imageUrl", url)}
      />

      <Field
        label="Tecnologías"
        hint="Separadas por comas"
        warning={repeatedWarning(values.techs, ",")}
      >
        <Input
          value={asText(values.techs, ", ")}
          onChange={(e) => onChange("techs", e.target.value)}
        />
      </Field>
      <Field label="Repositorio en GitHub">
        <Input type="url" {...bind("repoUrl")} />
      </Field>

      <Field
        label="Logros"
        hint="Uno por línea. Solo se muestran en los destacados"
        warning={repeatedWarning(values.highlights, "\n")}
        className="md:col-span-2"
      >
        <TextArea
          rows={3}
          value={asText(values.highlights, "\n")}
          onChange={(e) => onChange("highlights", e.target.value)}
        />
      </Field>

      <Field label="Artículo del blog">
        <Select {...bind("blogUrl")}>
          <option value="">Ninguno</option>
          {posts.map((post) => (
            <option key={post.slug} value={`/blog/${post.slug}`}>
              {post.title}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Categoría">
        <Select {...bind("category")}>
          <option value="">Sin categoría</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </Select>
      </Field>

      <div className="flex flex-wrap gap-x-6 md:col-span-2">
        <Checkbox
          label="Destacado"
          checked={Boolean(values.featured)}
          onChange={(e) => onChange("featured", e.target.checked)}
        />
        <Checkbox
          label="Cliente real (en producción)"
          checked={Boolean(values.client)}
          onChange={(e) => onChange("client", e.target.checked)}
        />
      </div>

      {/* Lo que se muestra en /en. Vacío = se usa el texto en español. Naranja
          suave (borde fino y tinte) para distinguirlo sin confundirlo con el
          borde naranja de "sin guardar". */}
      <fieldset className="grid gap-4 rounded-xl border border-brand/40 bg-brand/5 p-4 md:col-span-2 md:grid-cols-2 dark:bg-brand/10">
        <legend className="px-1 text-sm font-black text-brand-strong dark:text-brand">
          En inglés (opcional)
        </legend>
        <p className="-mt-1 text-sm text-muted md:col-span-2 dark:text-muted-dark">
          Si un campo queda vacío, la versión en inglés del sitio muestra el texto en español.
        </p>
        <Field label="Nombre en inglés">
          <Input {...bind("textEn")} />
        </Field>
        <Field label="Descripción en inglés" className="md:col-span-2">
          <TextArea {...bind("subtextEn")} rows={3} />
        </Field>
        <Field
          label="Logros en inglés"
          hint="Uno por línea, en el mismo orden que en español"
          warning={repeatedWarning(values.highlightsEn, "\n")}
          className="md:col-span-2"
        >
          <TextArea
            rows={3}
            value={asText(values.highlightsEn, "\n")}
            onChange={(e) => onChange("highlightsEn", e.target.value)}
          />
        </Field>
      </fieldset>
    </div>
  );
}
