import React, { useState, useEffect } from "react";
import ReyPerfil from "../../assets/ReyPerfil.jpg";
import Logo from "../../assets/Rey.svg";
import "./AnimatedLogo.css";

const AnimatedLogo = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="image-container" key={key}>
      <img src={Logo} alt="Logo Inicial" className="image image1" />
      <img src={ReyPerfil} alt="Logo Final" className="image image2" />
    </div>
  );
};

export default AnimatedLogo;
