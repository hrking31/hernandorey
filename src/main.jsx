import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProviderWrapper from "./Theme/ThemeContext.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {})
      .catch((error) => {});
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
