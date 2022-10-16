import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ user, cart, children }) {
  const admin = !!window.location.href.match("admin");
  return (
    <Fragment>
      {!admin ? <Navbar user={user} cart={cart} /> : null}
      {children}
      {!admin ? <Footer /> : null}
    </Fragment>
  );
}
