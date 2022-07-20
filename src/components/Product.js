import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function Product({ onCart, cart }) {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/products/${id}`).then(({ data }) => {
      setLoading(false);
      setItem(data);
    });
  }, [id]);

  const handleAdd = () => setQuantity(quantity + 1);
  const handleMinus = () => setQuantity(quantity - 1);
  const handleCart = () => {
    if (cart.map(({ item }) => item.id).includes(Number(id)) && cart.length !== 0) {
      cart[index(id)].quantity += quantity;
      onCart([...cart]);
    } else {
      onCart([...cart, { item, quantity }]);
    }
  };
  const index = (id) => cart.findIndex(({ item }) => item.id === Number(id));
  const checkDisable = (id) => cart[index(id)]?.quantity >= item.quantity || cart[index(id)]?.quantity + quantity > item.quantity;

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="card flex-md-row my-5 p-5 w-75 mx-auto">
        <img src={item.image} className="card-img-top" alt="" style={{ maxHeight: "25rem", width: "100%", objectFit: "scale-down" }} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text"> {`RM ${item.price}`}</p>
          <p className="card-text"> {`Currently In Stock: ${item.quantity}`}</p>
          <div className="d-flex align-items-center card-text">
            <button type="button" className="btn btn-primary btn-sm mr-1" onClick={handleMinus} disabled={quantity === 1}>
              -
            </button>
            <div className="card-text mx-3">{quantity}</div>
            <button type="button" className="btn btn-primary btn-sm ml-1" onClick={handleAdd} disabled={quantity === item.quantity}>
              +
            </button>
          </div>
          <button className="btn btn-primary my-3" onClick={handleCart} disabled={checkDisable(id)}>
            Add To Bag
          </button>
        </div>
      </div>
    </div>
  );
}
