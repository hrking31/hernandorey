import { IconButton, Box } from "@mui/material";
import { GitHub, Email, LinkedIn } from "@mui/icons-material";
import styles from "./SocialMedia.module.css";
import { useTheme } from "@mui/material/styles";

const SocialMedia = () => {
   const theme = useTheme();
  return (
    <Box className={styles.socialContainer}>
      <IconButton
        className={`${styles.socialIcon} ${
          theme.palette.mode === "dark"
            ? styles.socialIconDark
            : styles.socialIconLight
        } ${styles.github}`}
        href="https://github.com/hrking31"
      >
        <GitHub />
      </IconButton>

      <IconButton
        className={`${styles.socialIcon} ${
          theme.palette.mode === "dark"
            ? styles.socialIconDark
            : styles.socialIconLight
        } ${styles.linkedin}`}
        href="https://www.linkedin.com/in/hernandorey/"
      >
        <LinkedIn />
      </IconButton>

      <IconButton
        className={`${styles.socialIcon} ${
          theme.palette.mode === "dark"
            ? styles.socialIconDark
            : styles.socialIconLight
        } ${styles.email}`}
        href="mailto:hrking31@gmail.com"
      >
        <Email />
      </IconButton>
    </Box>
  );
};

export default SocialMedia;

