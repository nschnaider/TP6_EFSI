// main.tsx — Punto de entrada de la aplicación
// Este archivo existe por defecto con Vite, verificá que tenga este contenido

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// StrictMode activa verificaciones extra en desarrollo para detectar errores
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);