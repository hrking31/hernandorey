import { CardContent, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardPost({ logo, text, id}) {

  return (
    <Box
      sx={{
        cursor: "pointer",
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "divider",
          borderBottomColor: "transparent",
        },
      }}
    >
      <Link
        to={`/post/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardContent sx={{ py: "0.8rem !important" }}>
          <Box display="flex" gap={2} alignItems="center">
            {logo && (
              <Avatar
                src={logo}
                sx={{
                  width: { xs: 28, sm: 30, md: 35 },
                  height: { xs: 28, sm: 30, md: 35 },
                }}
              >
                L
              </Avatar>
            )}
            <Typography
              variant="body2"
              sx={{
                fontWeight: 900,
              }}
            >
              {text}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Box>
  );
}
