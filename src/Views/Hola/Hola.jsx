import { Divider, Typography, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReyPerfil from "../../assets/ReyPerfil.jpg";

export default function AboutMe() {
  return (
    <Box sx={{ maxwidth: 800, mt: 5, p: 3 }}>
      <Grid
        container
        alignItems="center"
        gap={1}
        sx={{ mb: 2 }}
        justifyContent="flex-end"
        pr={35}
      >
        <Typography
          variant="h2"
          display="flex"
          alignItems="center"
          lineHeight="1"
        >
          HOLA 👋🏻
        </Typography>
        <Avatar
          src={ReyPerfil}
          alt="Tu Nombre"
          sx={{ width: 60, height: 60 }}
        />
      </Grid>

      {/* Primer texto */}
      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        ¡Hola! Soy un desarrollador apasionado por la tecnología y el desarrollo
        web. Me encanta trabajar con React y Material-UI para crear aplicaciones
        modernas y funcionales.
      </Typography>

      <Divider />

      {/* Segundo texto */}
      <Typography variant="body1" sx={{ mt: 2 }}>
        Tengo experiencia en desarrollo full-stack, integrando frontend con
        backend y bases de datos para ofrecer soluciones eficientes y
        escalables.
      </Typography>

      <Divider />
    </Box>
  );
}
