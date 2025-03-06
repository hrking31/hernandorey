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
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "divider",
          borderBottomColor: "transparent",
        },
        // border: "2px solid #000",
      }}
    >
      <Box display="flex" alignItems="center" gap={4.5}>
        <Box
          sx={{
            textAlign: "left",
            pl: 2,
            // border: "2px solid #000",
          }}
        >
          <Avatar
            src={logo}
            sx={{
              width: { xs: 30, sm: 50, md: 55 },
              height: { xs: 30, sm: 50, md: 55 },
            }}
          >
            L
          </Avatar>
        </Box>
        <Box
          sx={{
            width: "auto",
            textAlign: "left",
            flexDirection: "column",
            // border: "2px solid #000",
          }}
        >
          {isInternal ? (
            <Typography variant="body2">
              <NavLink
                to={href}
                style={{
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {text}
              </NavLink>
            </Typography>
          ) : (
            <Typography variant="body2">
              <MuiLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                {text}
              </MuiLink>
            </Typography>
          )}

          {subtext && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                color: "text.secondary",
                textAlign: "justify",
                textJustify: "inter-word",
                wordBreak: "break-word",
                hyphens: "auto",
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
