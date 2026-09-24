import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { auth } from "../Firebase/Firebase";
import { Button, Card, Field, Input } from "../Admin/ui";

// Firebase ya no distingue "usuario no existe" de "contraseña incorrecta"
// (protección contra enumeración de correos), así que se informa junto.
const MENSAJES = {
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/wrong-password": "Correo o contraseña incorrectos.",
  "auth/user-not-found": "Correo o contraseña incorrectos.",
  "auth/invalid-email": "El correo no tiene un formato válido.",
  "auth/too-many-requests": "Demasiados intentos. Espera unos minutos y vuelve a intentarlo.",
  "auth/network-request-failed": "Sin conexión. Revisa tu internet.",
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/admin");
    } catch (err) {
      setError(MENSAJES[err.code] ?? "No se pudo iniciar sesión. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="mb-6 text-2xl font-black">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Correo electrónico">
          <Input
            type="email"
            name="email"
            autoComplete="username"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Contraseña">
          <span className="relative block">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              aria-pressed={showPassword}
              className="absolute top-0 right-0 flex size-11 items-center justify-center text-muted hover:text-brand-strong dark:text-muted-dark dark:hover:text-brand"
            >
              {showPassword ? (
                <LuEyeOff aria-hidden="true" className="size-5" />
              ) : (
                <LuEye aria-hidden="true" className="size-5" />
              )}
            </button>
          </span>
        </Field>

        {error && (
          <p role="alert" className="rounded-lg bg-red-700/10 px-3 py-2 text-sm font-bold text-red-800 dark:text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="mt-2 h-11">
          {loading ? "Entrando…" : "Iniciar sesión"}
        </Button>
      </form>
    </Card>
  );
}
