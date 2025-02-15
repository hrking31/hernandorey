import { Landing, Hola, Blog } from "./Views";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hola" element={<Hola />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}
