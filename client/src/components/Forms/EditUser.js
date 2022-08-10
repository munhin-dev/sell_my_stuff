import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading";
import axios from "axios";

export default function EditUser() {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/users").then(({ data }) => {
      setInput({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,
        mobile: data.mobile,
      });
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setInput((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .put("/api/users", { ...input })
      .then(() => navigate("/account"))
      .catch((err) => setErrors(err.response.data.error));
  };

  const invalid = (value) =>
    errors.some((err) => err.param === value) && "is-invalid";
  const message = (value) => errors.find((err) => err.param === value)?.msg;

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="row my-5">
        <form
          className="col mx-auto"
          onSubmit={handleSubmit}
          style={{ maxWidth: "350px" }}
        >
          <div className="form-group mt-4">
            <label>First Name</label>
            <input
              type="text"
              className={`form-control ${invalid("first_name")}`}
              name="first_name"
              onChange={handleChange}
              value={input.first_name}
            />
            <div className="invalid-feedback">{message("first_name")}</div>
          </div>
          <div className="form-group mt-4">
            <label>Last Name:</label>
            <input
              type="text"
              className={`form-control ${invalid("last_name")}`}
              name="last_name"
              onChange={handleChange}
              value={input.last_name}
            />
            <div className="invalid-feedback">{message("last_name")}</div>
          </div>
          <div className="form-group my-4">
            <label>Username:</label>
            <input
              type="text"
              className={`form-control ${invalid("username")}`}
              name="username"
              onChange={handleChange}
              value={input.username}
              disabled
            />
            <div className="invalid-feedback">{message("username")}</div>
          </div>

          <div className="form-group mt-4">
            <label>Email Address:</label>
            <input
              type="email"
              className={`form-control ${invalid("email")}`}
              name="email"
              onChange={handleChange}
              value={input.email}
              disabled
            />
            <div className="invalid-feedback">{message("email")}</div>
          </div>
          <div className="form-group mt-4">
            <label>Mobile Number:</label>
            <input
              type="text"
              className={`form-control ${invalid("mobile")}`}
              name="mobile"
              onChange={handleChange}
              value={input.mobile}
            />
            <div className="invalid-feedback">{message("mobile")}</div>
          </div>
          <div className="form-group mt-4">
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
