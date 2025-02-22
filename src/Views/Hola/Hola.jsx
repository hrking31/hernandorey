import { Divider, Typography, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReyPerfil from "../../assets/ReyPerfil.jpg";

export default function AboutMe() {
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
          justifyContent: "flex-end",
          pr: { xs: 3, md: 41 },
          mb: 2,
        }}
      >
        <Grid container alignItems="center" justifyContent="flex-end" gap={1}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.4rem", sm: "2.5rem", md: "3.9rem" },
            }}
          >
            Hola 👋🏻
          </Typography>
          <Avatar
            src={ReyPerfil}
            sx={{
              width: { xs: 50, sm: 60, md: 65 },
              height: { xs: 50, sm: 60, md: 65 },
            }}
          />
        </Grid>
      </Box>

      <Box
        sx={{
          maxWidth: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
          mt: { xs: 2, md: 4 },
          mb: { xs: 3, md: 5 },
          ml: { xs: "auto", md: 36 },
          mr: { xs: "auto", md: "auto" },
        }}
      >
        <Typography
          variant="body2"
          component="p"
          sx={{
            fontSize: { md: "1.3rem" },
          }}
        >
          Soy tu amigo y colega en el mundo del código...
          <strong style={{ color: "#e7562e", fontWeight: "900" }}>
            Hernando Rey
          </strong>
          .
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
          mb: { xs: 3, md: 5 },
          ml: { xs: "auto", md: 36 },
          mr: { xs: "auto", md: "auto" },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", sm: "2rem", md: "2rem" },
          }}
        >
          Ingeniero electrónico y desarrollador web, combinando hardware y
          software para crear soluciones únicas.
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
          ml: { xs: "auto", md: 36 },
          mr: { xs: "auto", md: "auto" },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { md: "1.3rem" },
            lineHeight: 1.8,
          }}
        >
          <strong style={{ color: "#20252c", fontWeight: "900" }}>
            Como Desarrollador Full Stack,
          </strong>
          mi pasión por la programación se combina con un compromiso de
          aprendizaje constante para dominar tecnologías emergentes. Tengo
          experiencia en el ciclo completo de desarrollo de aplicaciones web,
          diseñando interfaces intuitivas con React en el frontend y
          construyendo APIs robustas con Node.js y Express en el backend. Me
          especializo en crear arquitecturas escalables, integrando bases de
          datos SQL/NoSQL (como PostgreSQL y MongoDB) y servicios en la nube
          para maximizar el rendimiento y la eficiencia. Cada línea de código
          que escribo busca no solo resolver problemas, sino también ofrecer
          experiencias de usuario excepcionales.
        </Typography>
      </Box>
      <Divider sx={{ width: "80%", mt: 2 }} />
      
    </Box>
  );
}
