import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Components/Firebase/Firebase";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardsPost from "../../Components/CardsPost/CardsPost";
import SocialMedia from "../../Components/SocialMedia/SocialMedia";

export default function Blog() {
  console.log(
    "👋 Hola Soy tu amigo y colega en el mundo del código... Hernando rey 🦁"
  );
  const theme = useTheme();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "posts"));
      setPost(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
        // border: "2px solid #000",
      }}
    >
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: 4,
          // border: "2px solid #000",
        }}
      >
        <Typography variant="h2">Blog</Typography>
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
          En este espacio comparto mi viaje en el mundo tech a través de
          artículos, tutoriales, teoría aplicada y fragmentos de código. Exploro
          el desarrollo web, la automatización con Home Assistant, el teclado
          ergonómico Corne y post que combinan programación con hardware.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 1.5, md: 24 },
          mb: 2,
          // border: "2px solid #000",
        }}
      >
        <Typography
          variant="h4"
          sx={{
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
          Artículos
        </Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          [theme.breakpoints.up("md")]: { width: "90%" },
          [theme.breakpoints.up("lg")]: { width: "70%" },
          maxWidth: "90%",
          textAlign: "left",
          mb: { xs: 6, md: 7 },
          // border: "2px solid #000",
        }}
      >
        <CardsPost posts={post} />
      </Box>
      <Box>
        <SocialMedia />
      </Box>
    </Box>
  );
}
