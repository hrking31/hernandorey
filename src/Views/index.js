import Landing from "./Landing/Landing";
import Hola from "./Hola/Hola";
import Blog from "./Blog/Blog";
import Admin from "./Admin/Admin";
import SignIn from "./SignIn/SignIn";

// Post se carga aparte (React.lazy en App.jsx) para no sumar el procesador de
// Markdown a la carga inicial.
export { Landing, Hola, Blog, Admin, SignIn };
