import { Link as MuiLink, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const LinkItem = ({ href, text, subtext }) => {
  const isInternal = href.startsWith("/");

  return (
    <Box
      sx={{
        display: "block",
        borderBottom: "1px solid",
        borderColor: "divider",
        paddingY: 1,
        transition: "border-color 0.3s ease-in-out",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      {isInternal ? (
        <NavLink
          to={href}
          style={{
            display: "block",
            fontSize: "1rem",
            fontWeight: 900,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {text}
        </NavLink>
      ) : (
        <MuiLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: "block",
            fontSize: "1rem",
            fontWeight: 900,
            color: "text.primary",
          }}
        >
          {text}
        </MuiLink>
      )}
      {subtext && (
        <Typography
          variant="body2"
          component="small"
          sx={{ display: "block", fontWeight: 400, color: "text.secondary" }}
        >
          {subtext}
        </Typography>
      )}
    </Box>
  );
};

export default LinkItem;
