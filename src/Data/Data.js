// import AlarmaITXLogo from "../assets/AlarmaITX.svg";
// import BlogLogo from "../assets/BlogLogo.svg";
// import FerrequiposLogo from "../assets/FerrequiposLogo.svg";
import {
  AlarmaITXLogo,
  BlogLogo,
  FerrequiposLogo,
} from "../assets/LogosProyectos/LogosIndex";
import { Js, Git, VsCode } from "../assets/LogosPost/LogosIndex";

export const MenuNavBar = ["Blog", "Hola"];

export const YoSoy = [
  { text: "Hernando Alberto Rey Jimenez", mostrarEn: "ambos" },
  { text: "a.k.a. Hrking31", mostrarEn: "ambos" },
  { text: "Nací en Colombia. Marzo 31, 1982", mostrarEn: "ambos" },
  { text: "Vivo en Barranquilla", mostrarEn: "ambos" },
  { text: "Padre de dos Princesas 👑✨💖", mostrarEn: "ambos" },
  { text: "hrking31@gmail.com", mostrarEn: "solo-imprimir" },
  { text: "302 8446805", mostrarEn: "solo-imprimir" },
  { text: "https://hernandorey-31.web.app/", mostrarEn: "solo-imprimir" },
  { text: "CV", mostrarEn: "solo-pantalla" },
];

export const Estudios = [
  "Henry 🚀.",
  "Autodidacta.",
  "Ingeniero Electrónico (2005) PCA.",
];

export const links = [
  {
    logo: BlogLogo,
    href: "/Blog",
    text: "Blog Hernando Rey",
    subtext:
      "CMS personalizado con Firebase para gestionar textos, imágenes y código desde una interfaz de administración, automatizando la renderización de posts y agilizando la creación de artículos.",
  },
  {
    logo: AlarmaITXLogo,
    href: "https://alarmaremota-sbl01.web.app/",
    text: "Alarma ITX",
    subtext:
      "Sistema de monitorización remota con sensores ESP32 para visualizar en tiempo real el estado de equipos, optimizando la supervisión y control de dispositivos de manera eficiente.",
  },
  {
    logo: FerrequiposLogo,
    href: "https://ferrequiposdelacosta.com",
    text: "Ferrequipos De La Costa",
    subtext:
      "Catálogo digital de productos con funcionalidades CRUD (creación, edición y eliminación de productos), generación de cuentas de cobro y cotizaciones con descarga de PDFs con membrete.",
  },
];

export const post = [
  {
    id: "js",
    logo: Js,
    text: "JavaScript",
  },
  {
    id: "git",
    logo: Git,
    text: "Git",
  },
  {
    id: "vsc",
    logo: VsCode,
    text: "Visual Studio Code",
  },
];
