import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import ReYaz from "../../assets/ReYaz.jpg";
import "./Post.css";

const AnimatedImage = () => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={imgRef}
      component="img"
      src={ReYaz}
      alt="Imagen animada"
      className={`animated-image ${isVisible ? "visible" : "hidden"}`}
    />
  );
};

export default AnimatedImage;
