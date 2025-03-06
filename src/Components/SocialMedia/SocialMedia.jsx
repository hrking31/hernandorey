import { IconButton, Box } from "@mui/material";
import { GitHub, Email, LinkedIn } from "@mui/icons-material";
import styles from "./SocialMedia.module.css";

const SocialMedia = () => {
  return (
    <Box className={styles.socialContainer}>
      <IconButton
        className={`${styles.socialIcon} ${styles.github}`}
        href="https://github.com/hrking31"
      >
        <GitHub />
      </IconButton>

      <IconButton
        className={`${styles.socialIcon} ${styles.linkedin}`}
        href="https://www.linkedin.com/in/hernandorey/"
      >
        <LinkedIn />
      </IconButton>

      <IconButton
        className={`${styles.socialIcon} ${styles.email}`}
        href="mailto:hrking31@gmail.com"
      >
        <Email />
      </IconButton>
    </Box>
  );
};

export default SocialMedia;
