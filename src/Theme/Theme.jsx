import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#ff5500",
      },
      secondary: {
        main: "#1976d2",
      },
      background: {
        default: mode === "dark" ? "#20252c" : "#fcfcfc",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#b0b0b0" : "#666666",
      },
    },

    typography: {
      fontFamily: "'Raleway', sans-serif",
      h2: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: "3.9rem",
        [`@media (max-width:900px)`]: { fontSize: "2.5rem" },
        [`@media (max-width:600px)`]: { fontSize: "2.4rem" },
      },

      body1: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: "2rem",
        [`@media (max-width:900px)`]: { fontSize: "2rem" },
        [`@media (max-width:600px)`]: { fontSize: "1.2rem" },
      },

      body2: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "1.3rem",
        [`@media (max-width:900px)`]: { fontSize: "1.2rem" },
        [`@media (max-width:600px)`]: { fontSize: "1rem" },
      },

      h4: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "3.2rem",
        [`@media (max-width:900px)`]: { fontSize: "2rem" },
        [`@media (max-width:600px)`]: { fontSize: "1.8rem" },
      },
    },

    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === "dark" ? "#20252c" : "#fcfcfc",
          },
        },
      },
    },
  });
// Color: #282c34
