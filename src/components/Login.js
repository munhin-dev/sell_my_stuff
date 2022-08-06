import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login({ onLogin, onAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await axios.post("/login", { username, password });
      const { data } = await axios.get("/authenticate");
      const { isLoggedIn, isAdmin } = data;
      Cookies.set("login", isLoggedIn);
      Cookies.set("admin", isAdmin);
      onLogin(isLoggedIn);
      onAdmin(isAdmin);
      navigate(-1);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleUsername = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  return (
    <div>
      <div className="alert alert-danger" role="alert" style={{ visibility: error ? "visible" : "hidden", minHeight: "65.58px" }}>
        {error}
      </div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col" style={{ maxWidth: "350px" }}>
            <div className="form-group mb-2">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input type="text" id="username" className="form-control" onChange={handleUsername} />
            </div>
            <div className="form-group mb-4">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input type="password" id="password" className="form-control" autoComplete="on" onChange={handlePassword} />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>
          </div>
        </div>
        <div className="text-center pb-5 mb-5">
          <p>
            Not a member?
            <Link to="/signup">
              <span style={{ color: "blue" }}> Register</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
