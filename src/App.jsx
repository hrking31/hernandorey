import { Landing, Home, Hola, Blog } from "./Views";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}
