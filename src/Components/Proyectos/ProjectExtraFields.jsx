import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { posts } from "../../content/blog";

const CATEGORIAS = ["Web", "IoT y Hardware", "Herramientas"];

// Muestra listas guardadas como arreglo en un campo de texto editable.
const asText = (value, separator) =>
  Array.isArray(value) ? value.join(separator) : value ?? "";

// Campos de la tarjeta de proyecto: captura, tecnologías, logros, repositorio,
// categoría y etiquetas. Se usan al crear y al editar un proyecto.
export default function ProjectExtraFields({ values, onChange, dense = false }) {
  const margin = dense ? "dense" : "none";
  const field = (name) => ({
    value: values[name] ?? "",
    onChange: (e) => onChange(name, e.target.value),
    fullWidth: true,
    margin,
  });

  return (
    <Box sx={{ display: "grid", gap: dense ? 0 : 2 }}>
      <TextField label="URL de la captura" {...field("imageUrl")} />
      <TextField
        label="Tecnologías (separadas por comas)"
        {...field("techs")}
        value={asText(values.techs, ", ")}
      />
      <TextField
        label="Logros (uno por línea, solo para destacados)"
        {...field("highlights")}
        value={asText(values.highlights, "\n")}
        multiline
        rows={3}
      />
      <TextField label="Repositorio en GitHub" {...field("repoUrl")} />
      <TextField select label="Artículo del blog" {...field("blogUrl")}>
        <MenuItem value="">Ninguno</MenuItem>
        {posts.map((post) => (
          <MenuItem key={post.slug} value={`/blog/${post.slug}`}>
            {post.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField select label="Categoría" {...field("category")}>
        <MenuItem value="">Sin categoría</MenuItem>
        {CATEGORIAS.map((categoria) => (
          <MenuItem key={categoria} value={categoria}>
            {categoria}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(values.featured)}
              onChange={(e) => onChange("featured", e.target.checked)}
            />
          }
          label="Destacado"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(values.client)}
              onChange={(e) => onChange("client", e.target.checked)}
            />
          }
          label="Cliente real (en producción)"
        />
      </Box>
    </Box>
  );
}
