import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/signin" />;
  return children ? children : <Outlet />;
}
