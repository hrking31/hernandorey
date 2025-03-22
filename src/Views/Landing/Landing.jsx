import { Typography, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import AnimatedLogo from "../../Components/AnimatedLogo/AnimatedLogo";

const LandingContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  [theme.breakpoints.up("md")]: { width: "90%" },
  [theme.breakpoints.up("lg")]: { width: "70%" },
  maxWidth: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  // border: "2px solid #000",

  [theme.breakpoints.up(992)]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const LandingImage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  order: -1,
  width: "100%",
  alignSelf: "flex-start",
  paddingBottom: "10px",
  // border: "2px solid #000",

  [theme.breakpoints.up(992)]: {
    order: 1,
    width: "30%",
  },
}));

const LandingText = styled(Box)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  // border: "2px solid #000",

  [theme.breakpoints.up(992)]: {
    width: "70%",
    textAlign: "left",
    paddingRight: "10px",
  },
}));

export default function Landing() {
  console.log(
    "👋 Hola Soy tu amigo y colega en el mundo del código... Hernando Rey 🦁"
  );
  const theme = useTheme();

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
        // border: "2px solid #000",
      }}
    >
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: { xs: 4, md: 5.5 },
          // border: "2px solid #000",
        }}
      >
        <Typography
          sx={{ fontWeight: 700, fontSize: "1.5rem", fontStyle: "normal" }}
        >
          Hola, Soy
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "#e7562e",
            fontWeight: 900,
            position: "relative",
            textAlign: "center",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              bottom: "-4px",
              width: "30%",
              height: "2px",
              backgroundColor: "#e7762e",
              transform: "translateX(-50%)",
            },
          }}
        >
          Hernando Rey
        </Typography>
      </Box>

      <LandingContainer>
        <LandingImage>
          <AnimatedLogo />
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
            Software Engineer & UX
          </Typography>
        </LandingImage>

        <LandingText>
          <Box display="flex" flexDirection="column" gap={2}>
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
                Como Developer,
              </strong>
              &nbsp;me gusta crear soluciones que unen diseño, tecnología y
              funcionalidad.
            </Typography>
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
                Resolver problemas,
              </strong>
              &nbsp;optimizar procesos y crear soluciones, ya sea a través de
              sistemas automatizados o experiencias digitales.
            </Typography>
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
              Disfruto todo el proceso de creación, desde la concepción de una
              idea hasta su materialización en un producto real.
            </Typography>
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
              Adicto al café ☕, amante del ejercicio 🏋🏻💪, cinéfilo empedernido
              🎬🍿, y entusiasta de la domótica 🏠..
            </Typography>
          </Box>
        </LandingText>
      </LandingContainer>
      <Divider
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          mt: 6,
          mb: { xs: 5.5, md: 7.5 },
          borderBottomWidth: "2.5px",
        }}
      />
      <Box>
        <SocialMedia />
      </Box>
    </Box>
  );
}
