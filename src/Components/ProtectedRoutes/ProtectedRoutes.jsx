import { Navigate } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";
import useAuthUser from "../../hooks/useAuthUser";

export function ProtectedRoutes({ children }) {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <div role="status" className="flex justify-center pt-24 lg:pt-40">
        <LuLoaderCircle aria-hidden="true" className="size-8 animate-spin text-brand" />
        <span className="sr-only">Cargando…</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/signin" replace />;

  return children;
}
