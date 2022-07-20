import Login from "../components/Login";
import handleSignin from "../components/App";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (!user) return <Login onSignin={handleSignin} />;
  return children ? children : <Outlet />;
}
