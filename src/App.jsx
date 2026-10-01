import { lazy, Suspense, useEffect, useRef } from "react";
import { Landing, Hola, Blog, Proyectos } from "./Views";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProtectedRoutes } from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";
import { auth } from "./Components/Firebase/Firebase";
import { signOut } from "firebase/auth";
import NavBar from "./Components/NavBar/NavBar";
import ScrollManager from "./Components/ScrollManager/ScrollManager";
import LanguageNotice from "./Components/LanguageNotice/LanguageNotice";
import { langFromPath, useLang } from "./i18n/lang";

// Se descargan solo al visitarlas: los artículos (procesador de Markdown) y
// el panel de administración (Storage y formularios).
const Post = lazy(() => import("./Views/Post/Post"));
const SignIn = lazy(() => import("./Views/SignIn/SignIn"));
const Admin = lazy(() => import("./Views/Admin/Admin"));

// /hola pasó a /sobre-mi, y los proyectos que tenía al final (/hola#proyectos)
// tienen ahora su página: los enlaces viejos siguen funcionando.
function HolaRedirect() {
  const { hash } = useLocation();
  const { to } = useLang();
  return <Navigate to={to(hash === "#proyectos" ? "/proyectos" : "/sobre-mi")} replace />;
}

export default function App() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const { i18n } = useTranslation();
  const lang = langFromPath(location.pathname);

  // Por seguridad, la sesión se cierra al salir del panel.
  useEffect(() => {
    if (prevPath.current === "/admin" && location.pathname !== "/admin") {
      signOut(auth);
    }
    prevPath.current = location.pathname;
  }, [location.pathname]);

  // El idioma sigue a la URL. El título solo se cambia si es el de inicio del
  // otro idioma, para no pisar el de un artículo abierto.
  useEffect(() => {
    const other = lang === "en" ? "es" : "en";
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    if (document.title === i18n.t("meta.title", { lng: other })) {
      document.title = i18n.t("meta.title", { lng: lang });
    }
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", i18n.t("meta.description", { lng: lang }));
  }, [lang, i18n]);

  return (
    <div>
      <ScrollManager />
      <NavBar />
      <LanguageNotice />
      <Suspense fallback={null}>
        <Routes>
          {/* Las páginas públicas existen en español (/) y en inglés (/en). */}
          {["/", "/en"].map((base) => (
            <Route key={base} path={base}>
              <Route index element={<Landing />} />
              <Route path="proyectos" element={<Proyectos />} />
              <Route path="sobre-mi" element={<Hola />} />
              <Route path="hola" element={<HolaRedirect />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<Post />} />
            </Route>
          ))}
          {/* Enlaces antiguos a /post/... llevan a la lista del blog. */}
          <Route path="/post/:id" element={<Navigate to="/blog" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <Admin />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
