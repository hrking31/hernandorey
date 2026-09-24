import { getStorage } from "firebase/storage";
import { app } from "./Firebase";

// Storage solo lo usa el panel de administración; al estar en su propio
// módulo no se descarga para los visitantes del sitio.
export const storage = getStorage(app);
