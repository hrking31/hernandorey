import { createContext } from "react";

// { mode: "light" | "dark", toggleTheme() } — ver ThemeContext.jsx
export const ThemeContext = createContext({ mode: "light", toggleTheme: () => {} });
