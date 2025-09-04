import Login from "../../Components/Login/Login";
import { Box } from "@mui/material";

export default function SignIn() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, md: 3 },
        mt: { xs: 6, md: 8 },
      }}
    >
      <Login />
    </Box>
  );
}
