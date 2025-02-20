import React, { useContext } from "react";
import { ThemeContext } from "../../Theme/ThemeContext";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeSwitcher() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton
      onClick={toggleTheme}
      color="primary"
      sx={{
        color: mode === "dark" ? "#f5f5f5" : "#282c34",
        backgroundColor:
          mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)", // Fondo más claro en modo oscuro
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor:
            mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)", // Más claro al pasar el mouse
        },
      }}
    >
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
