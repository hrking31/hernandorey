import {
  SiCss,
  SiDocker,
  SiEspressif,
  SiEsphome,
  SiExpress,
  SiFirebase,
  SiGit,
  SiHomeassistant,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiSequelize,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";

export const MenuNavBar = ["Blog", "Hola"];

export const YoSoy = [
  { text: "Hernando Alberto Rey Jimenez", mostrarEn: "ambos" },
  { text: "a.k.a. Hrking31", mostrarEn: "ambos" },
  { text: "Nací en Colombia", mostrarEn: "ambos" },
  { text: "Vivo en Barranquilla", mostrarEn: "ambos" },
  { text: "Padre de dos Princesas 👑✨💖", mostrarEn: "ambos" },
  { text: "hrking31@gmail.com", mostrarEn: "solo-imprimir" },
  { text: "302 844 6805", mostrarEn: "solo-imprimir" },
  { text: "https://hernandorey-31.web.app/", mostrarEn: "solo-imprimir" },
  { text: "CV", mostrarEn: "solo-pantalla" },
];

export const Estudios = [
  "Henry 🚀.",
  "Autodidacta.",
  "Ingeniero Electrónico (2005) PCA.",
];

// color: null usa el color del texto (para logos negros como Express).
export const tecnologias = [
  // --- Frontend ---
  { name: "React", icon: SiReact, color: "#58c4dc" },
  { name: "JavaScript", icon: SiJavascript, color: "#e8c500" },
  { name: "CSS", icon: SiCss, color: "#1572b6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Material UI", icon: SiMui, color: "#007fff" },
  { name: "Vite", icon: SiVite, color: "#9467fe" },

  // --- Estado ---
  { name: "Redux", icon: SiRedux, color: "#764abc" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764abc" },

  // --- Backend ---
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "Express", icon: SiExpress, color: null },
  { name: "Firebase", icon: SiFirebase, color: "#ffa000" },

  // --- Bases de datos ---
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Sequelize", icon: SiSequelize, color: "#52b0e7" },

  // --- IoT y domótica ---
  { name: "ESP32", icon: SiEspressif, color: "#e7352c" },
  { name: "ESPHome", icon: SiEsphome, color: "#18bcf2" },
  { name: "Home Assistant", icon: SiHomeassistant, color: "#18bcf2" },

  // --- Herramientas ---
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
];
