import React, { useEffect, useState } from "react";
import { Box, keyframes } from "@mui/material";
import axios from "axios";

const API_KEY = "pXh96Km9WrQgJ25RU0PHAagtWg4JN05OQ6brBpS3bMnZ9sX6JrSiVlYf";
const QUERY = "technology";
const IMAGES_PER_PAGE = 30;

const fadeInZoom = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Collage = () => {
  const [images, setImages] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
          params: { query: QUERY, per_page: IMAGES_PER_PAGE },
          headers: { Authorization: API_KEY },
        });
        setImages(response.data.photos);
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const gridCols = Math.floor(Math.sqrt(images.length));
      const gridRows = Math.ceil(images.length / gridCols);

      const newPositions = images.map((_, i) => {
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);

        return {
          size: Math.random() * 15 + 10 + "vw",
          sizeSmall: Math.random() * 30 + 20 + "vw",
          posX: col * (100 / gridCols) + Math.random() * 5 - 2 + "vw",
          posY: row * (100 / gridRows) + Math.random() * 5 - 2 + "vh",
          rotate: Math.random() * 40 - 20,
        };
      });

      setPositions(newPositions);
    }
  }, [images]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        overflow: "hidden",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "rgba(20, 20, 20, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {images.map((image, index) =>
        positions[index] ? (
          <Box
            key={image.id}
            component="img"
            src={image.src.medium}
            alt={image.photographer}
            sx={{
              width: {
                xs: positions[index].sizeSmall,
                sm: positions[index].size,
              },
              height: "auto",
              position: "absolute",
              top: positions[index].posY,
              left: positions[index].posX,
              transform: `rotate(${positions[index].rotate}deg)`,
              opacity: 0,
              animation: `${fadeInZoom} 3.5s ease-out ${index * 0.2}s forwards`,
            }}
          />
        ) : null
      )}
    </Box>
  );
};

export default Collage;
