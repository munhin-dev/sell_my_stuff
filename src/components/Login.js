import axios from "axios";
import { useState } from "react";

export default function Signin({ onSignin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    axios
      .post("/login", { username, password })
      .then(({ data: { isAuthenticated } }) => onSignin(isAuthenticated))
      .catch((err) => setError(err.response.data.error));
  };

  const handleUsername = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form className="container-sm my-5 py-5">
        <div className="row justify-content-center">
          <div className="col col-md-6 col-lg-4 ">
            <div className="form-group mb-4">
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
            <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleClick}>
              Sign in
            </button>
          </div>
        </div>
        <div className="text-center">
          <p>
            Not a member?{" "}
            <a href="signup" style={{ color: "blue" }}>
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
