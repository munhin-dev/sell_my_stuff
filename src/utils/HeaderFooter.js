import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HeaderFooter(props) {
  return (
    <div>
      {window.location.pathname !== "/admin" ? <Navbar signin={props.user} cart={props.cart} /> : null}
      {props.children}
      {window.location.pathname !== "/admin" ? <Footer /> : null}
    </div>
  );
}
