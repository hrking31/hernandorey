import { Divider, Typography, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReyPerfil from "../../assets/ReyPerfil.jpg";
import ReYaz from "../../assets/ReYaz.jpg";
import { useTheme } from "@mui/material/styles";
import styles from "../Hola/Hola.module.css";

export default function AboutMe() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "50vh",
        textAlign: "center",
        mt: { xs: 6.4, md: 18 },
        // border: "2px solid #000",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "10vh",
          display: "flex",
          justifyContent: "flex-end",
          pr: { xs: 1.5, md: 27 },
          mb: 2,
          // border: "2px solid #000",
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
              width: { xs: 62, sm: 60, md: 65 },
              height: { xs: 62, sm: 60, md: 65 },
            }}
          />
        </Grid>
      </Box>
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
          mt: { xs: 2, md: 4 },
          mb: { xs: 3, md: 5 },
          // border: "2px solid #000",
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
          width: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
          mb: { xs: 3, md: 5 },
          // border: "2px solid #000",
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
          width: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
          mb: { xs: 3, md: 4 },
          // border: "2px solid #000",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { md: "1.3rem" },
            lineHeight: 1.8,
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

      <Divider
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%" },
          mt: 2,
          mb: { xs: 3, md: 5 },
        }}
      />

      <Box
        sx={{
          width: "100%",
          minHeight: "10vh",
          display: "flex",
          justifyContent: "flex-end",
          pr: { xs: 1.5, md: 24 },
          mb: 6,
          // border: "2px solid #000",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2.4rem", sm: "2.5rem", md: "3.9rem" },
          }}
        >
          Yo soy
        </Typography>
      </Box>

      <Box
        className={styles.imageContainer}
        sx={{
          width: "100%",
          display: "flex",
          // justifyContent: "flex-start",
          justifyContent: { xs: "center", md: "350px" },
          mt: 6,
          mb: 10,
          // border: "2px solid #000",
        }}
      >
        <img
          src={ReYaz}
          alt="Img"
          className={styles.image}
          // style={{ marginLeft: window.innerWidth < 600 ? "70px" : "350px" }}
        />
      </Box>
    </Box>
  );
}
