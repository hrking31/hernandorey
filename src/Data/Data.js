import {
  SiDocker,
  SiEspressif,
  SiEsphome,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGooglecloud,
  SiHomeassistant,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPwa,
  SiReact,
  SiRedux,
  SiSequelize,
  SiTailwindcss,
  SiVite,
  SiVitest,
} from "react-icons/si";

// key: texto del menú en es.json/en.json (nav.<key>).
export const MenuNavBar = [
  { key: "proyectos", path: "/proyectos" },
  { key: "sobre", path: "/sobre-mi" },
  { key: "blog", path: "/blog" },
];

// "diario": las que se ven en los proyectos publicados (van en la cinta).
// "otras": las que ha usado pero ningún proyecto publicado muestra todavía.
// color: null usa el color del texto (para logos negros como Express).
export const tecnologias = [
  // --- Uso a diario ---
  { name: "React", icon: SiReact, color: "#58c4dc", group: "diario" },
  { name: "JavaScript", icon: SiJavascript, color: "#e8c500", group: "diario" },
  { name: "Vite", icon: SiVite, color: "#9467fe", group: "diario" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4", group: "diario" },
  { name: "Material UI", icon: SiMui, color: "#007fff", group: "diario" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764abc", group: "diario" },
  { name: "Firebase", icon: SiFirebase, color: "#ffa000", group: "diario" },
  { name: "Cloud Functions", icon: SiGooglecloud, color: "#4285f4", group: "diario" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e", group: "diario" },
  { name: "Vitest", icon: SiVitest, color: "#6e9f18", group: "diario" },
  { name: "PWA", icon: SiPwa, color: "#5a0fc8", group: "diario" },
  { name: "ESP32", icon: SiEspressif, color: "#e7352c", group: "diario" },
  { name: "ESPHome", icon: SiEsphome, color: "#18bcf2", group: "diario" },
  { name: "Home Assistant", icon: SiHomeassistant, color: "#18bcf2", group: "diario" },
  { name: "Git", icon: SiGit, color: "#f05032", group: "diario" },

  // --- He trabajado con ---
  { name: "Express", icon: SiExpress, color: null, group: "otras" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1", group: "otras" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1", group: "otras" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248", group: "otras" },
  { name: "Sequelize", icon: SiSequelize, color: "#52b0e7", group: "otras" },
  { name: "Docker", icon: SiDocker, color: "#2496ed", group: "otras" },
];
