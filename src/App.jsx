import { lazy, Suspense, useEffect, useRef } from "react";
import { Landing, Hola, Blog, Admin, SignIn } from "./Views";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";
import { auth } from "./Components/Firebase/Firebase";
import { signOut } from "firebase/auth";
import NavBar from "./Components/NavBar/NavBar";
import ScrollManager from "./Components/ScrollManager/ScrollManager";

const Post = lazy(() => import("./Views/Post/Post"));

export default function App() {
  const location = useLocation();
   const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === "/admin" && location.pathname !== "/admin") {
      signOut(auth);
    }
    prevPath.current = location.pathname; 
  }, [location.pathname]);

  return (
    <div>
      <ScrollManager />
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hola" element={<Hola />} />
        <Route path="/blog" element={<Blog />} />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={null}>
              <Post />
            </Suspense>
          }
        />
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
    </div>
  );
}
