import { IconButton, Box, Tooltip } from "@mui/material";
import { GitHub, Email, LinkedIn } from "@mui/icons-material";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import styles from "./SocialMedia.module.css";
import { useTheme } from "@mui/material/styles";

const SocialMedia = () => {
   const theme = useTheme();
     const [copi, setCopi] = useState(false);
     const email = "hrking31@gmail.com";

      const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      };

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
      <Tooltip title="hrking31@gmail.com" arrow>
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
      </Tooltip>
      <Tooltip title={copi ? "¡Copiado!" : "Copiar correo"} arrow>
        <IconButton
          className={`${styles.socialIcon} ${
            theme.palette.mode === "dark"
              ? styles.socialIconDark
              : styles.socialIconLight
          } ${styles.email}`}
          onClick={handleCopy}
        >
          <ContentCopy />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialMedia;

