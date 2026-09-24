import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProviderWrapper from "./Theme/ThemeContext.jsx";

console.log(
  "👋 Hola Soy tu amigo y colega en el mundo del código... Hernando Rey 🦁"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
