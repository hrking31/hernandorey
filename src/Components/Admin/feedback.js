import { createContext, useContext } from "react";

// Avisos flotantes y confirmaciones del panel (ver FeedbackProvider.jsx).
export const ToastContext = createContext(() => {});
export const ConfirmContext = createContext(() => Promise.resolve(false));

// toast("Guardado") o toast("No se pudo guardar", "error")
export const useToast = () => useContext(ToastContext);

// if (await confirm("¿Eliminar este proyecto?")) { ... }
export const useConfirm = () => useContext(ConfirmContext);
