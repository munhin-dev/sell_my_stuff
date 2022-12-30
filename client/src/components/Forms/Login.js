import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function LoginForm({ onLogin, onCartUpdate, cart }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data: user } = await axios.post("/api/login", {
        username,
        password,
      });

      onLogin.handleUser(user.isLoggedIn);
      onLogin.handleAdmin(user.isAdmin);
      if (cart.length) {
        await axios.post("/api/cart", { cart: JSON.stringify(cart) });
      } else {
        const { data: cart } = await axios.get("/api/cart");
        onCartUpdate(JSON.parse(cart.content));
      }
        Swal.fire({
          icon: "success",
          title: "Log In Successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate(-1));
      
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Credentials",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleUsername = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  return (
    <>
      <form className="container mt-5" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col" style={{ maxWidth: "350px" }}>
            <div className="form-group mb-2">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                onChange={handleUsername}
              />
            </div>
            <div className="form-group mb-4">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                autoComplete="on"
                onChange={handlePassword}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>
          </div>
        </div>
        <div className="text-center pb-5">
          <p>
            Not a member?
            <Link to="/signup">
              <span style={{ color: "blue" }}> Register</span>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
