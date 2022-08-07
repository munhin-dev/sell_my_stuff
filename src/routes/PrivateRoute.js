import { Outlet } from "react-router-dom";
import Restricted from "../pages/Restricted";

export default function PrivateRoute({ admin, children }) {
  if (!admin) return <Restricted />;
  return children ? children : <Outlet />;
}
