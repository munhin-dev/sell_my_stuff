import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [input, setInput] = useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/products/create/`, { input }).then(() => navigate("/admin"));
  };

  const handleChange = (event) => {
    if (event.target) {
      setInput({ ...input, [event.target.name]: event.target.value });
    } else {
      setInput({ ...input, category: event.value });
    }
  };

  const options = [
    { value: "1", label: "Video Games" },
    { value: "2", label: "TV & Home Appliances" },
    { value: "3", label: "Music & DVD" },
    { value: "4", label: "Musical Instruments" },
    { value: "5", label: "Books" },
  ];

  return (
    <div>
      <div className="container my-5 d-flex justify-content-center">
        <form className="col col-md-8 col-lg-5 col-xl-3" onSubmit={handleSubmit}>
          <div className="form-group my-2">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" id="name" onChange={handleChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" name="description" id="description" onChange={handleChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="category">Category</label>
            <Select options={options} onChange={handleChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="quantity">Quantity</label>
            <input type="text" className="form-control" name="quantity" id="quantity" onChange={handleChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" name="price" id="price" onChange={handleChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="image">Image</label>
            <input type="text" className="form-control" name="image" id="image" onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary my-2 d-block mx-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
