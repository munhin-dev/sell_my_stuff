import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, onCart, user }) {
  const navigate = useNavigate();
  const handleRemove = (event, id) => {
    event.preventDefault();
    const newCart = cart.filter(({ item }) => item.id !== id);
    onCart(newCart);
  };

  const handleMinus = (id) => {
    cart[index(id)].quantity -= 1;
    onCart([...cart]);
  };

  const handlePlus = (id) => {
    cart[index(id)].quantity += 1;
    onCart([...cart]);
  };

  const handleCheckout = () => {
    if (!user) return;
    let items = cart.map(({ item, quantity }) => ({ id: item.id, quantity }));
    axios
      .post("/api/checkout", { items })
      .then(({ data }) => (window.location = data.url))
      .catch((err) => {
        if (err.response.data.error === "Insufficient Inventory") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Item has insufficient inventory.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => navigate("/"));
        } else if (err.response.data.error === "Address not found") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Shipping address not found.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => navigate("/account"));
        } else {
          console.log(err);
        }
      });
  };

  const calculateTotal = () => cart.reduce((total, { item, quantity }) => total + item.price * quantity, 0);
  const index = (id) => cart.findIndex((product) => product.item.id === Number(id));

  if (cart.length === 0) {
    return (
      <div>
        <div className="container my-4">
          <h2> Shopping Bag</h2>
        </div>
        <div className="container mb-5">
          <div className="card" style={{ width: "100%", height: "25vh" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <h4 className="card-title text-center">No items added to this bag </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container my-4">
        <h2> Shopping Bag</h2>
      </div>
      <div className="container mb-4 ">
        <div className="row justify-content-center">
          <div className="col">
            {cart.map(({ item }) => {
              const buyAmount = cart[index(item.id)].quantity;
              return (
                <div className="card flex-row align-self-start p-4 my-2" key={item.id}>
                  <img
                    src={item.image}
                    className="card-image-top align-self-center"
                    alt=""
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "scale-down",
                    }}
                  />
                  <div className="card-body py-1">
                    <div className="d-flex justify-content-between">
                      <h5>{item.name}</h5>
                      <h5>RM {item.price}</h5>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <h6 className="my-auto">Quantity:</h6>
                      <div className="d-flex align-items-center card-text">
                        <button type="button" className="btn btn-primary btn-sm mr-1" onClick={() => handleMinus(item.id)} disabled={buyAmount === 1}>
                          -
                        </button>
                        <div className="card-text mx-3">{buyAmount}</div>
                        <button type="button" className="btn btn-primary btn-sm ml-1" onClick={() => handlePlus(item.id)} disabled={buyAmount === item.quantity}>
                          +
                        </button>
                      </div>
                    </div>
                    <a href="/" className="my-3" style={{ float: " right" }} onClick={(event) => handleRemove(event, item.id)}>
                      <i className="fa fa-trash"></i>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card align-self-start" style={{ width: "25rem" }}>
            <div className="card-body my-4">
              <h4 className="card-title my-4 ">Order Summary</h4>
              <h5 className="card-subtitle my-4 ">
                Subtotal: <span style={{ float: " right" }}>RM {calculateTotal()}</span>
              </h5>
              <h5 className="card-subtitle my-4 ">
                Estimated Shipping: <span style={{ float: " right" }}>Free</span>
              </h5>
              <h6 className="card-text text-muted">Shipping only available via Poslaju</h6>
              <h5 className="card-subtitle my-4">
                Total: <span style={{ float: " right" }}>RM {calculateTotal()}</span>
              </h5>
              <Link to="/checkout">
                <button type="button" className="btn btn-primary d-block mx-auto btn-lg" onClick={handleCheckout}>
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
