import { Divider, Typography, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

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
    </Box>
  );
}
