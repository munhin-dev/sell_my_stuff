import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Shipping() {
  const [input, setInput] = useState({ shipped: true });
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/order/update/${id}`, { tracking_number: input.tracking_number, shipped: JSON.parse(input.shipped) })
      .then(() => (window.location.href = "/admin"));
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container my-5 d-flex justify-content-center">
        <form className="col col-md-8 col-lg-5 col-xl-3" onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="tracking_number">Tracking Number</label>
            <input type="text" className="form-control" name="tracking_number" id="tracking_number" onChange={handleChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="shipped">Shipped</label>
            <select className="form-control" id="shipped" name="shipped" onChange={handleChange}>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary my-2 d-block mx-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
