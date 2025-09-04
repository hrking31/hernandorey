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
        fontSize: "clamp(2.4rem, 5vw, 3.9rem)",
        [`@media (max-width:900px)`]: { fontSize: "2.8rem" },
        [`@media (max-width:600px)`]: { fontSize: "2.4rem" },
      },
      h3: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "normal",
        fontWeight: 900,
        fontSize: "calc(1.3rem + 2.7vw)",
        [`@media (max-width:900px)`]: { fontSize: "2.4rem" },
        [`@media (max-width:600px)`]: { fontSize: "2rem" },
      },

      h4: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "calc(1.5rem + 1.5vw)",
        [`@media (max-width:900px)`]: { fontSize: "2rem" },
        [`@media (max-width:600px)`]: { fontSize: "1.8rem" },
      },

      body1: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: "clamp(0.875rem, 1rem + 0.3vw, 1.8rem)",
      },

      body2: {
        fontFamily: "'Raleway', sans-serif",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "clamp(0.875rem, 1rem + 0.3vw, 1.25rem)",
      },
    },

    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              backgroundColor: "transparent",
              borderRadius: "8px",
              padding: "4px 8px",
            },

            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px transparent inset",
              WebkitTextFillColor: mode === "dark" ? "#ffffff" : "#000000",
              backgroundClip: "padding-box",
              transition: "background-color 5000s ease-in-out 0s",
            },

            "& input::placeholder": {
              color: mode === "dark" ? "#bbbbbb" : "#888888",
              opacity: 1,
            },
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === "dark" ? "#20252c" : "#fcfcfc",
          },
        },
      },
    },
  });
