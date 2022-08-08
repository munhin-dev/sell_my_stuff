import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import Loading from "../../pages/Loading";
import { useNavigate } from "react-router-dom";
import domain from "../../utils";

export default function EditProduct() {
  const [product, setProduct] = useState();
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${domain}/api/products/${id}`).then(({ data }) => {
      setProduct(data);
      setInput({
        name: data.name,
        description: data.description,
        category: data.category_id,
        quantity: data.quantity,
        price: data.price,
        image: data.image,
      });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${domain}/api/products/update/${id}`, { input }).then(() => navigate("/admin"));
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

  if (loading) return <Loading />;

  return (
    <div className="container my-5 d-flex justify-content-center">
      <form className="col col-md-8 col-lg-5 col-xl-3" onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={handleChange} value={input.description} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" name="description" id="description" onChange={handleChange} value={input.name} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="category">Category</label>
          <Select options={options} defaultValue={options[product?.category_id - 1]} onChange={handleChange} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" className="form-control" name="quantity" id="quantity" onChange={handleChange} value={input.quantity} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="price">Price</label>
          <input type="text" className="form-control" name="price" id="price" onChange={handleChange} value={input.price} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="image">Image</label>
          <input type="text" className="form-control" name="image" id="image" onChange={handleChange} value={input.image} />
        </div>

        <button type="submit" className="btn btn-primary my-2 d-block mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
}
