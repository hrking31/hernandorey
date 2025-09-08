import { Box } from "@mui/material";
import { tecnologias } from "../../Data/Data";
import "./TechCarousel.css";

export default function TechCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {[...tecnologias, ...tecnologias].map((tech, index) => (
          <Box
            key={index}
            component="img"
            alt={tech.name}
            src={`https://img.shields.io/badge/-${tech.name}-${tech.color}?style=flat-square&logo=${tech.logo}&logoColor=white`}
            sx={{
              margin: "4px",
              maxWidth: "120px",
              height: { xs: "auto", md: "25px" },
            }}
          />
        ))}
      </div>
    </div>
  );
}
