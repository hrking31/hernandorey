// Plugin de remark para los recuadros de Obsidian:
//
//   > [!tip] Título opcional
//   > Contenido del recuadro
//
// Convierte ese blockquote en <aside class="callout callout-tip"> con su título.

const TITULOS = {
  note: "Nota",
  abstract: "Resumen",
  summary: "Resumen",
  tldr: "Resumen",
  info: "Información",
  todo: "Pendiente",
  tip: "Consejo",
  hint: "Consejo",
  important: "Importante",
  success: "Listo",
  check: "Listo",
  done: "Listo",
  question: "Pregunta",
  help: "Pregunta",
  faq: "Pregunta",
  warning: "Atención",
  caution: "Atención",
  attention: "Atención",
  failure: "Error",
  fail: "Error",
  missing: "Error",
  danger: "Peligro",
  error: "Peligro",
  bug: "Bug",
  example: "Ejemplo",
  quote: "Cita",
  cite: "Cita",
};

const MARCA = /^\[!([a-zA-Z-]+)\][+-]?[ \t]*([^\n]*)\n?/;

function transform(node) {
  if (node.type === "blockquote") {
    const paragraph = node.children[0];
    const first = paragraph?.type === "paragraph" ? paragraph.children[0] : null;
    const match = first?.type === "text" ? first.value.match(MARCA) : null;

    if (match) {
      const type = match[1].toLowerCase();
      const title = match[2].trim() || TITULOS[type] || type;

      first.value = first.value.slice(match[0].length);
      if (!first.value) paragraph.children.shift();
      if (paragraph.children[0]?.type === "break") paragraph.children.shift();
      if (paragraph.children.length === 0) node.children.shift();

      node.children.unshift({
        type: "paragraph",
        data: { hProperties: { className: ["callout-title"] } },
        children: [{ type: "text", value: title }],
      });
      node.data = {
        hName: "aside",
        hProperties: { className: ["callout", `callout-${type}`] },
      };
    }
  }
  node.children?.forEach(transform);
}

export default function remarkCallouts() {
  return (tree) => transform(tree);
}
