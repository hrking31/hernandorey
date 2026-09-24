import { useEffect, useRef } from "react";
import { Landing, Hola, Blog, Post, Admin, SignIn } from "./Views";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoutes } from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";
import { auth } from "./Components/Firebase/Firebase";
import { signOut } from "firebase/auth";
import NavBar from "./Components/NavBar/NavBar";

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
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hola" element={<Hola />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<Post />} />
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
