import { Navigate, Outlet } from "react-router";
import { getToken } from "../../utils/auth";

export function ProtectedRoute() {
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
