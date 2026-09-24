import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Components/Firebase/Firebase";
import {
  Divider,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReyPerfil from "../../assets/ReyPerfil.jpg";
import { useTheme } from "@mui/material/styles";
import { Estudios } from "../../Data/Data";
import Profile from "../../Components/Profile/Profile";
// import AnimacionImg from "../../Components/AnimacionImg/AnimacionImg";
import LinkItem from "../../Components/LinkItem/LinkItem";
import { tecnologias } from "../../Data/Data";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import TechCarousel from "../../Components/TechCarousel/TechCarousel";

export default function AboutMe() {
  const theme = useTheme();
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "proyectos"));
      setProyectos(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
        px: { xs: 1, md: 2.8 },
        mt: { xs: 6.4, md: 18 },
        "@media print": {
          pt: 8,
          margin: "0",
        },
        // border: "2px solid #000",
      }}
    >
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          display: "flex",
          justifyContent: "flex-end",
          mb: { xs: 4, md: 5.5 },
          // border: "2px solid #000",
        }}
      >
        <Grid container alignItems="center" gap={1}>
          <Typography variant="h2">Hola 👋🏻</Typography>
          <Avatar
            src={ReyPerfil}
            sx={{
              width: { xs: 62, sm: 60, md: 65 },
              height: { xs: 62, sm: 60, md: 65 },
            }}
          />
        </Grid>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: { xs: 3, md: 5 },
          // border: "2px solid #000",
        }}
      >
        <Typography variant="body2" component="p">
          Soy tu amigo y colega en el mundo del código...
          <strong style={{ color: "#e7562e", fontWeight: "900" }}>
            Hernando Rey
          </strong>
          .
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: { xs: 3, md: 5 },
          // border: "2px solid #000",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.4,
            textAlign: "justify",
            textJustify: "inter-word",
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          Ingeniero electrónico y desarrollador web, combinando hardware y
          software para crear soluciones únicas.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: { xs: 3, md: 4.5 },
          // border: "2px solid #000",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.6,
            textAlign: "justify",
            textJustify: "inter-word",
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          <strong
            sx={{
              color: theme.palette.mode === "dark" ? "#fcfcfc" : "#282c34",
              fontWeight: "900",
            }}
          >
            Como Desarrollador Full Stack,
          </strong>
          &nbsp; combino mi pasión por la programación con un compromiso
          constante de aprendizaje para dominar tecnologías emergentes. Tengo
          experiencia en todo el ciclo de desarrollo de aplicaciones web, desde
          la creación de interfaces intuitivas con React en el frontend hasta la
          construcción de APIs robustas con Node.js y Express en el backend. Me
          especializo en diseñar arquitecturas escalables, integrando bases de
          datos SQL y NoSQL (como PostgreSQL y MongoDB) y aprovechando servicios
          en la nube para optimizar el rendimiento y la eficiencia. Cada línea
          de código que escribo no solo resuelve problemas, sino que también
          busca ofrecer experiencias de usuario excepcionales y soluciones
          tecnológicas innovadoras.
        </Typography>
      </Box>
      <Divider
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          mt: 1,
          mb: { xs: 3, md: 5.5 },
          "@media print": { display: "none" },
          borderBottomWidth: "2.5px",
        }}
      />
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          display: "flex",
          justifyContent: "flex-end",
          // border: "2px solid #000",
        }}
      >
        <Typography variant="h3">Yo soy</Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          margin: "auto",
          display: "flex",
          justifyContent: "flex-end",
          mt: { xs: 2, md: 4 },
          mb: { xs: 4, md: 6 },
          // border: "2px solid #000",
        }}
      >
        <Profile />
      </Box>
      {/* <AnimacionImg /> */}
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: { xs: 2, md: 3 },
          // border: "2px solid #000",
        }}
      >
        <Typography variant="h4">Educación</Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: { xs: 3, md: 4 },
          // border: "2px solid #000",
        }}
      >
        <List dense>
          {Estudios.map((text, index, array) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">{array.length - index}.</Typography>
              <Typography variant="body2">{text}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: { xs: 2, md: 3 },
          "@media print": {
            pt: 8,
            margin: "0",
          },
          // border: "2px solid #000",
        }}
      >
        <Typography variant="h4">Tecnologías</Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          mt: 2.5,
          mb: { xs: 2, md: 3 },
          // border: "2px solid #000",
        }}
      >
        <Box sx={{ display: "none", "@media print": { display: "block" } }}>
          {tecnologias.map((tech, index) => (
            <Box
              key={index}
              component="img"
              alt={tech.name}
              src={`https://img.shields.io/badge/-${tech.name}-${tech.color}?style=flat-square&logo=${tech.logo}&logoColor=white`}
              sx={{
                margin: "4px",
                maxWidth: "100px",
                height: { xs: "auto", md: "25px" },
              }}
            />
          ))}
        </Box>
        <Box sx={{ "@media print": { display: "none" } }}>
          <TechCarousel />
        </Box>
      </Box>
      <Divider
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          mt: 2,
          mb: { xs: 5, md: 5 },
          "@media print": { display: "none" },
          borderBottomWidth: "2.5px",
        }}
      />
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          display: "flex",
          justifyContent: "flex-end",
          "@media print": {
            pt: 8,
          },
          // border: "2px solid #000",
        }}
      >
        <Typography variant="h3">¿Qué he hecho?</Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mt: { xs: 3, md: 4 },
          mb: { xs: 2.5, md: 5 },
          // border: "2px solid #000",
        }}
      >
        <Typography variant="h4">Proyectos</Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: { xs: 6, md: 7 },
          // border: "2px solid #000",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "90%", md: "88%" },
          }}
        >
          {proyectos
            .slice()
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((link) => (
              <LinkItem
                key={link.id}
                href={link.href}
                text={link.text}
                subtext={link.subtext}
                logo={link.logoUrl}
              />
            ))}
        </Box>
      </Box>

      <Box sx={{ "@media print": { display: "none" } }}>
        <SocialMedia />
      </Box>
    </Box>
  );
}
