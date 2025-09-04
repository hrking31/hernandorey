import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Components/Firebase/Firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function ProtectedRoutes({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}


