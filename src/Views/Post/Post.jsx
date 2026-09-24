// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../Store//Slices/LoadingSlice";
// import { fetchEquiposData } from "../../Store/Actions/equiposAction";
// import CardsPost from "../../Components/CardsPost/CardsPost";
import { Box, Typography } from "@mui/material";

export default function Post() {
  //     const dispatch = useDispatch();
  //     useEffect(() => {
  //       dispatch(setLoading(true));
  //       dispatch(fetchEquiposData());
  //     }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "50vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#e7562e",
          fontSize: "1.8rem",
          marginBottom: "25px",
        }}
      >
        🚧 Este post está en construcción 🏗️
      </Typography>
      <Typography
        variant="body2"
        sx={{
          maxWidth: "600px",
        }}
      >
        Estamos trabajando para traerte contenido increíble. Vuelve pronto para
        descubrir nuevas publicaciones. ¡Gracias por tu paciencia! 😊
      </Typography>
    </Box>
  );
}
