// import { Divider, Typography, Avatar, Box } from "@mui/material";
// import Grid from "@mui/material/Grid2";

///////////////////////////////////////////////////////////////////////////
import { Divider, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LinkItem from "../../Components/LinkItem/LinkItem";
import { links } from "../../Data/Data";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
/////////////////////////////////////////////////////////////////////////////////

export default function Blog() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        mt: { xs: 8, md: 18 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          pl: { xs: 3, md: 36 },
          mb: 2,
        }}
      >
        <Grid container alignItems="center" justifyContent="flex-end">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.4rem", sm: "2.5rem", md: "3.9rem" },
            }}
          >
            Blog
          </Typography>
        </Grid>
      </Box>
      <Box
        sx={{
          maxWidth: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
          ml: { xs: "auto", md: 36 },
          mr: { xs: "auto", md: "auto" },
          mt: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { md: "1.3rem" },
            lineHeight: 1.8,
          }}
        >
          En este espacio comparto mi viaje en el mundo tech: artículos
          detallados, tutoriales paso a paso, teorías aplicables y fragmentos de
          código depurados. Exploro temas de desarrollo web, automatización del
          hogar con Home Assistant (¡incluyendo mis configuraciones DIY!), y el
          fascinante universo de teclados ergonómicos como el Corne (PCB,
          firmware ZMK y layouts personalizados). Además de presentaciones
          técnicas y reflexiones sobre arquitectura de software, encontrarás
          proyectos prácticos donde fusiono programación con hardware - desde
          scripts para optimizar mi setup de teclados custom hasta integraciones
          creativas en Home Assistant. Cada publicación es una bitácora de mis
          descubrimientos y experimentos, diseñada para aprender en comunidad
          mientras construyo soluciones tangibles.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          minHeight: "10vh",
          display: "flex",
          justifyContent: "flex-end",
          px: { xs: 1.5, md: 24 },
          mb: 2,
          // border: "2px solid #000",
        }}
      >
        <Typography variant="h2">Artículos</Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: { xs: 5, md: 7 },
          // border: "2px solid #000",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "88%" },
            mt: 4,
          }}
        >
          {links.map((link, index) => (
            <LinkItem
              key={index}
              href={link.href}
              text={link.text}
              subtext={link.subtext}
              logo={link.logo}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ "@media print": { display: "none" }, mb: { xs: 10, md: 7 } }}>
        <SocialMedia />
      </Box>
    </Box>
  );
}
