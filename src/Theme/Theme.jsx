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
