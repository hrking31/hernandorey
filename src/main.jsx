import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ThemeProviderWrapper from "./Theme/ThemeContext.jsx";
import store from "./Store/Store.js";

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
    <Provider store={store}>
      <ThemeProviderWrapper>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ThemeProviderWrapper>
    </Provider>
  </React.StrictMode>
);
