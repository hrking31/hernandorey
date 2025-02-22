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
        mt: { xs: 8, md: 18}
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
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
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
          mb: 2,
        }}
      >
        <Typography variant="body1" component="p">
          Soy tu amigo y colega en el mundo del código...
          <strong style={{ color: "#e7562e" }}>Hernando Rey</strong>.
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: { xs: "90%", sm: "80%", md: "70%" },
          textAlign: "left",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
          }}
        >
          Ingeniero electrónico y desarrollador web, combinando hardware y
          software para crear soluciones únicas.
        </Typography>
      </Box>

      <Divider sx={{ width: "80%", mt: 2 }} />
    </Box>
  );
}
