import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";

export default function Signup() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/register", { ...inputs });
    } catch (err) {
      setErrors(err.response.data.error);
    }
  };

  const invalid = (value) => errors.some((err) => err.param === value) && "is-invalid";
  const message = (value) => errors.find((err) => err.param === value)?.msg;

  return (
    <div className="container col-8 my-5" style={{ maxWidth: "350px" }}>
      <div className="row flex-column mt-5">
        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="text-end">
            <Link to="/">
              <button type="button" className="btn-close" aria-label="Close"></button>
            </Link>
          </div>
          <h5>Kindly fill up below:</h5>
          <div className="form-group mt-4">
            <label>First Name</label>
            <input type="text" className={`form-control ${invalid("first_name")}`} name="first_name" onChange={handleChange} />
            <div className="invalid-feedback">{message("first_name")}</div>
          </div>
          <div className="form-group mt-4">
            <label>Last Name:</label>
            <input type="text" className={`form-control ${invalid("last_name")}`} name="last_name" onChange={handleChange} />
            <div className="invalid-feedback">{message("last_name")}</div>
          </div>
          <div className="form-group mt-4">
            <label>Username:</label>
            <input type="text" className={`form-control ${invalid("username")}`} name="username" onChange={handleChange} />
            <div className="invalid-feedback">{message("username")}</div>
          </div>
          <div className="form-group mt-4">
            <label className="d-block">
              <div className="d-flex align-items-end justify-content-between">
                <div>Password:</div>
                <div className="App">
                  <i className="fa fa-exclamation-circle opacity-50" data-tip data-for="registerTip" aria-hidden="true"></i>
                  <ReactTooltip id="registerTip" place="top" effect="solid" type="dark" multiline={true}>
                    - Password must be at least 5 characters long <br />
                    - Contain one uppercase letters <br />
                    - Contain one special case letter
                  </ReactTooltip>
                </div>
              </div>
            </label>
            <input type="password" className={`form-control ${invalid("password")}`} name="password" autoComplete="off" onChange={handleChange} />
            <div className="invalid-feedback" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
              {message("password")}
            </div>
          </div>
          <div className="form-group mt-4">
            <label>Email Address:</label>
            <input type="email" className={`form-control ${invalid("email")}`} name="email" onChange={handleChange} />
            <div className="invalid-feedback">{message("email")}</div>
          </div>
          <div className="form-group mt-4">
            <label>Mobile Number:</label>
            <input type="text" className={`form-control ${invalid("mobile")}`} name="mobile" onChange={handleChange} />
            <div className="invalid-feedback">{message("mobile")}</div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
