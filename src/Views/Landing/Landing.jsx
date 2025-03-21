import { Typography, Avatar, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";
import AnimatedLogo from "../../Components/AnimatedLogo/AnimatedLogo";
import { tecnologias } from "../../Data/Data";

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
          <Box
            sx={{
              display: "block",
              "@media (min-width: 992px)": { display: "none" },
              mt: 2,
            }}
          >
            {tecnologias.map((tech, index) => (
              <img
                key={index}
                alt={tech.name}
                src={`https://img.shields.io/badge/-${tech.name}-${tech.color}?style=flat-square&logo=${tech.logo}&logoColor=white`}
                style={{
                  margin: "4px",
                  maxWidth: "100px",
                  height: "auto",
                }}
              />
            ))}
          </Box>
        </LandingImage>

        <LandingText>
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
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <strong
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#fcfcfc" : "#282c34",
                    fontWeight: "900",
                  }}
                >
                  Como Developer,
                </strong>
                &nbsp;me gusta crear soluciones que unen diseño, tecnología y
                funcionalidad.
              </Box>
              <Box>
                <strong
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#fcfcfc" : "#282c34",
                    fontWeight: "900",
                  }}
                >
                  Resolver problemas,
                </strong>
                &nbsp;optimizar procesos y crear soluciones, ya sea a través de
                sistemas automatizados o experiencias digitales.
              </Box>
              <Box>
                Disfruto todo el proceso de creación, desde la concepción de una
                idea hasta su materialización en un producto real.
              </Box>
              <Box>
                Adicto al café ☕, amante del ejercicio 🏋🏻💪, cinéfilo
                empedernido 🎬🍿, y entusiasta de la domótica 🏠..
              </Box>
            </Box>
          </Typography>
        </LandingText>
      </LandingContainer>

      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          display: "none",
          "@media (min-width: 992px)": { display: "block" },
          mt: 6,
        }}
      >
        {tecnologias.map((tech, index) => (
          <img
            key={index}
            alt={tech.name}
            src={`https://img.shields.io/badge/-${tech.name}-${tech.color}?style=flat-square&logo=${tech.logo}&logoColor=white`}
            style={{ margin: "4px", maxWidth: "100px", height: "auto" }}
          />
        ))}
      </Box>
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
