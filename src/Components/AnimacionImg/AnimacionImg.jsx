import ReYaz from "../../assets/ReYaz.jpg";
import styles from "./AnimacionImg.module.css";

const AnimatedImage = () => {
  return (
    <div className={styles.imageContainer}>
      <img src={ReYaz} alt="Hernando Rey" className={styles.image} />
    </div>
  );
};

export default AnimatedImage;
