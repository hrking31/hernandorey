import ReyPerfil from "../../assets/ReyPerfil.jpg";
import Logo from "../../assets/Rey.png";
import "./AnimatedLogo.css";

// El logo se desvanece y aparece la foto (animación en AnimatedLogo.css).
export default function AnimatedLogo() {
  return (
    <div className="image-container">
      <img src={Logo} alt="" className="image image1" />
      <img src={ReyPerfil} alt="Hernando Rey" className="image image2" />
    </div>
  );
}
