import { Link as MuiLink, Typography, Box, Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";

const LinkItem = ({ href, text, subtext, logo }) => {
  const isInternal = href.startsWith("/");

  const LinkWrapper = ({ children }) =>
    isInternal ? (
      <NavLink
        to={href}
        style={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {children}
      </NavLink>
    ) : (
      <MuiLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          display: "block",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {children}
      </MuiLink>
    );

  return (
    <LinkWrapper>
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
          cursor: "pointer",
        }}
      >
        <Box display="flex"  gap={4.5}>
          <Box
            sx={{
              textAlign: "left",
              pl: 2,
            }}
          >
            <Avatar
              src={logo}
              sx={{
                width: { xs: 35, sm: 50, md: 55 },
                height: { xs: 35, sm: 50, md: 55 },
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
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", fontWeight: 700 }}
            >
              {text}
            </Typography>

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
    </LinkWrapper>
  );
};

export default LinkItem;
