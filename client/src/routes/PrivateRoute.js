import { Outlet } from "react-router-dom";
import Restricted from "../pages/Restricted";

export default function PrivateRoute({ admin }) {
  return admin ? <Outlet /> : <Restricted />;
}
