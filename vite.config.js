import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        // Los artículos del blog NO se precargan: con muchos, cada visitante
        // nuevo bajaría megas que no va a leer. Se guardan en caché recién
        // cuando alguien abre uno (y así sigue funcionando sin internet).
        globIgnores: ["**/articulo-*.js"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => /\/assets\/articulo-[^/]+\.js$/.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "articulos",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
          {
            // Imágenes de artículos y proyectos del propio sitio (con hash en
            // el nombre, así que nunca cambian): se guardan al verlas.
            urlPattern: ({ request, url }) =>
              request.destination === "image" && url.pathname.startsWith("/assets/"),
            handler: "CacheFirst",
            options: {
              cacheName: "imagenes",
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
        ],
      },
      manifest: {
        id: "/",
        name: "Hernando Rey",
        short_name: "HRey",
        description:
          "Hola, soy Hernando Rey. Código que transforma las ideas en realidad",
        start_url: "/",
        display: "standalone",
        background_color: "#e7562e",
        theme_color: "#e7562e",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Cada artículo del blog sale en su propio archivo articulo-xxxx.js,
        // para distinguirlo del código de la app (ver workbox.globIgnores).
        chunkFileNames(chunk) {
          const esArticulo = chunk.moduleIds.some(
            (id) => id.includes("/src/content/blog/") && id.includes(".md")
          );
          return esArticulo ? "assets/articulo-[hash].js" : "assets/[name]-[hash].js";
        },
        manualChunks(id) {
          // Storage queda fuera: solo lo usa el panel, que se carga aparte.
          if (
            id.includes("node_modules") &&
            id.includes("firebase") &&
            !id.includes("storage")
          ) {
            return "firebase";
          }
        },
      },
    },
  },
});
