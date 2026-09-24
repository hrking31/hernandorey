# Hernando Rey · Portafolio y blog

Mi sitio personal: portafolio de proyectos, CV y un blog que escribo en **Obsidian** y publico con un script propio, sin CMS.

**🌐 En vivo:** [hernandorey-31.web.app](https://hernandorey-31.web.app/)

> Desarrollador Full Stack · Ingeniero electrónico · React, Node.js y Firebase · IoT con ESP32

---

## Qué hay dentro

- **Portafolio** con proyectos destacados, filtros por categoría y enlaces a demo, código y artículos relacionados.
- **Blog sin CMS:** los artículos se escriben en Obsidian y `npm run blog` los convierte a páginas web.
- **Panel de administración** con Firebase Auth para editar proyectos, subir capturas y logos, y actualizar el CV sin tocar código.
- **CV imprimible:** la página *Hola* tiene estilos de impresión propios.
- **PWA** instalable, modo claro y oscuro (respeta la preferencia del sistema) y diseño adaptable.
- **Vista previa al compartir** en LinkedIn y WhatsApp (Open Graph).

## Tecnologías

| Área | Herramientas |
|---|---|
| Frontend | React 18, React Router 7, Vite 6, Tailwind CSS 4 |
| Backend como servicio | Firebase: Firestore, Auth, Storage y Hosting |
| Blog | Obsidian, Markdown, react-markdown, remark-gfm, highlight.js |
| Herramientas | Node.js (script de publicación), sharp (optimización de imágenes), vite-plugin-pwa, ESLint |

## Blog: de Obsidian a la web

Escribo en Obsidian, en el celular o en el PC (sincronizados con Syncthing). Cuando una nota está lista, le agrego `publicar: true` y ejecuto `npm run blog`:

```mermaid
flowchart LR
  A[Nota en Obsidian<br/>publicar: true] --> B[npm run blog]
  B --> C[Convierte la sintaxis de Obsidian]
  B --> D[Optimiza las imágenes<br/>WebP, máx. 1600 px]
  C --> E[src/content/blog/&lt;slug&gt;/index.md]
  D --> E
  B --> F[posts.json]
  E --> G[Página del artículo]
  F --> H[Lista del blog]
```

El script ([`scripts/sync-blog.mjs`](scripts/sync-blog.mjs)) resuelve lo que un lector de Markdown estándar no entiende:

| Sintaxis de Obsidian | Resultado en la web |
|---|---|
| `![[foto.jpg]]` | Imagen normal, optimizada a WebP |
| `![[diagrama.canvas]]` | Su exportación como imagen |
| `[[Otra nota\|alias]]` | Texto plano |
| `> [!tip] Título` | Recuadro de color con título ([`remarkCallouts.js`](src/utils/remarkCallouts.js)) |

La bóveda solo se **lee**: el script nunca escribe en ella, y solo se publican las notas marcadas.

## Estructura

```
scripts/sync-blog.mjs        Publicación de artículos desde Obsidian
src/
  Components/
    Admin/                   Panel: proyectos, imágenes, CV, avisos
    Projects/                Tarjetas y sección pública de proyectos
    Layout/                  Piezas de maquetación compartidas
  content/blog/              Artículos generados (no se editan a mano)
  hooks/                     useAuthUser, useCvUrl
  utils/                     remarkCallouts, listas, rutas de Storage
  Views/                     Inicio, Hola, Blog, Artículo, Login, Panel
```

El panel, el login y el procesador de Markdown se cargan con `React.lazy`, así los visitantes solo descargan lo que ven.

## Cómo ejecutarlo

Requisitos: **Node.js 20.12 o superior** y un proyecto de Firebase.

```bash
git clone https://github.com/hrking31/hernandorey.git
cd hernandorey
npm install
cp .env.example .env.local   # y completa los valores
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run blog` | Trae de Obsidian las notas con `publicar: true` |
| `npm run build` | Compila para producción en `dist/` |
| `npm run preview` | Sirve la versión compilada |
| `npm run lint` | Revisa el código con ESLint |

Despliegue: `npm run build && firebase deploy`.

### Variables de entorno

Ver [`.env.example`](.env.example). La configuración web de Firebase no es secreta: la seguridad la dan las **reglas de Firestore y Storage**, que solo permiten escribir al usuario administrador.

## Contacto

- LinkedIn: [linkedin.com/in/hernandorey](https://www.linkedin.com/in/hernandorey/)
- GitHub: [github.com/hrking31](https://github.com/hrking31)
- Correo: hrking31@gmail.com
