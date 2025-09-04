import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Components/Firebase/Firebase";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const passwordType = passwordVisible ? "text" : "password";

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);

      navigate("/admin");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no registrado");
      } else {
        setError("Error al iniciar sesión");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: { xs: 400, sm: 450, md: 500, lg: 600 },
        mx: "auto",
        px: { xs: 2, md: 3 },
        mt: { xs: 6, md: 8 },
      }}
    >
      <Card sx={{ width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gap: 2 }}
          >
            <TextField
              type="email"
              name="email"
              label="Correo Electrónico"
              value={user.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              type={passwordType}
              name="password"
              label="Contraseña"
              value={user.password}
              onChange={handleChange}
              fullWidth
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordVisible((prev) => !prev)}
                        edge="end"
                        color="primary"
                      >
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
