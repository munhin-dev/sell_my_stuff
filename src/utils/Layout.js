import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HeaderFooter(props) {
  const isAdminPath = window.location.pathname.includes("/admin");
  return (
    <div>
      {!isAdminPath ? <Navbar signin={props.user} cart={props.cart} /> : null}
      {props.children}
      {!isAdminPath ? <Footer /> : null}
    </div>
  );
}
