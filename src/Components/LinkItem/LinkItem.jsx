import { Link as MuiLink, Typography, Box, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NavLink } from "react-router-dom";

const LinkItem = ({ href, text, subtext, logo }) => {
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
        // border: "2px solid #000",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            textAlign: "left",
            mx: "auto",
            // border: "2px solid #000",
          }}
        >
          <Avatar
            src={logo}
            sx={{
              width: { xs: 62, sm: 60, md: 65 },
              height: { xs: 62, sm: 60, md: 65 },
            }}
          >
            L
          </Avatar>
        </Box>
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%" },
            textAlign: "left",
            flexDirection: "column",
            mx: "auto",
            // border: "2px solid #000",
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
              sx={{
                display: "block",
                fontWeight: 400,
                color: "text.secondary",
              }}
            >
              {subtext}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LinkItem;
