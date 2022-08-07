import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ user, cart, children }) {
  const adminPath = window.location.pathname.includes("/admin");
  return (
    <Fragment>
      {!adminPath ? <Navbar signin={user} cart={cart} /> : null}
      {children}
      {!adminPath ? <Footer /> : null}
    </Fragment>
  );
}
