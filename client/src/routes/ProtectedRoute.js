import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ user }) {
  return user ? <Outlet /> : <Navigate to="/signin" />;
}
