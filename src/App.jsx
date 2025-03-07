import { Landing, Hola, Blog } from "./Views";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import { Box } from "@mui/material";

export default function App() {
  return (
    <div>
      <Box sx={{ "@media print": { display: "none" } }}>
        <NavBar />
      </Box>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hola" element={<Hola />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}
