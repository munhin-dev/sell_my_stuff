import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Address() {
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/address`).then(({ data }) => {
      setAddress(data);
      setInput({
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        city: data.city,
        postal_code: data.postal_code,
        country: data.country,
      });
      setLoading(false);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    address
      ? axios.put(`/api/address`, { input }).then(() => navigate("/account"))
      : axios.post(`/api/address`, { input }).then(() => navigate("/account"));
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="container my-5 d-flex justify-content-center">
        <form
          className="col col-md-8 col-lg-5 col-xl-3"
          onSubmit={handleSubmit}
        >
          <div className="form-group my-2">
            <label htmlFor="address_line1">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              name="address_line1"
              id="address_line1"
              onChange={handleChange}
              defaultValue={address?.address_line1}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="address_line2">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              name="address_line2"
              id="address_line2 "
              onChange={handleChange}
              defaultValue={address?.address_line2}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              id="city"
              onChange={handleChange}
              defaultValue={address?.city}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="postal_code">Postal Code</label>
            <input
              type="text"
              className="form-control"
              name="postal_code"
              id="postal_code"
              onChange={handleChange}
              defaultValue={address?.postal_code}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="image">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              id="country"
              onChange={handleChange}
              defaultValue={address?.country}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary my-2 d-block mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
