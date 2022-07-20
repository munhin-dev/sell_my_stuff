import { Outlet } from "react-router-dom";
import Unauthorized from "../components/Restricted";

export default function PrivateRoute({ admin, children }) {
  if (!admin) return <Unauthorized />;
  return children ? children : <Outlet />;
}
