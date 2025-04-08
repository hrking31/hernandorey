// import ReYaz from "../../assets/ReYaz.jpg";
// import styles from "./AnimacionImg.module.css";

// const AnimatedImage = () => {
//   return (
//     <div className={styles.imageContainer}>
//       <img src={ReYaz} alt="Hernando Rey" className={styles.image} />
//     </div>
//   );
// };

// export default AnimatedImage;

import ReYaz from "../../assets/ReYaz.jpg";
import styles from "./AnimacionImg.module.css";

const AnimatedImage = () => {
  return (
    <div
      className={styles.imageContainer}
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                entry.target.classList.toggle(
                  styles.unset,
                  entry.isIntersecting
                );
              });
            },
            { root: null, threshold: 1 }
          );
          observer.observe(el);
        }
      }}
    >
      <img src={ReYaz} alt="Hernando Rey" className={styles.image} />
    </div>
  );
};

export default AnimatedImage;
