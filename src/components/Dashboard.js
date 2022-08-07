import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
const dayjs = require("dayjs");

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orders = axios.get("/api/dashboard/orders");
    const products = axios.get("/api/products");
    Promise.all([orders, products]).then(([orders, products]) => {
      setOrders(orders.data);
      setProducts(products.data);
      setLoading(false);
    });
  }, []);

  const calculateTotal = (arr) => {
    return JSON.parse(arr).reduce(
      (total, order) => total + order.quantity * order.item.price,
      0
    );
  };

  const calculateEarning = (arr) => {
    return arr
      .map(({ content }) => content)
      .reduce((total, item) => total + calculateTotal(item), 0);
  };

  if (loading) return <Loading />;

  return (
    <div className="container my-4">
      <div className="row">
        <h2>Dashboard</h2>
        <h3 className="my-3">Total Sales: RM {calculateEarning(orders)}</h3>
      </div>
      <div className="row justify-content-end">
        <a href="/admin/product/new" className="col-auto btn btn-primary">
          Add Product
        </a>
      </div>
      <div className="my-5" style={{ height: "300px", overflowY: "scroll" }}>
        <table className="table caption-top">
          <caption>List of orders</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order Date</th>
              <th scope="col">Total Paid</th>
              <th scope="col">Order By</th>
              <th scope="col">Shipped</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>
                    {dayjs(order.created_at).format("YYYY-MM-DD hh:mm A")}
                  </td>
                  <td>RM {calculateTotal(order.content)}</td>
                  <td>{order.username}</td>
                  <td>
                    {order.shipped ? (
                      <button type="button" className="btn btn-success" disabled>
                        YES
                      </button>
                    ) : (
                      <button type="button" className="btn btn-danger" disabled>
                        NO
                      </button>
                    )}
                  </td>
                  <td className="col-2">
                    <p>
                      <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#address${order.id}`}
                        style={{
                          position: "relative",
                          top: "8px",
                        }}
                      >
                        Address
                      </button>
                    </p>
                    <div className="collapse" id={`address${order.id}`}>
                      <div
                        className="card card-body mt-2 p-4"
                        style={{ position: "relative", left: "-30px" }}
                      >
                        {[
                          order.address_line1,
                          order.address_line2,
                          order.city,
                          order.postal_code,
                          order.country,
                        ].join(", ")}
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link to={`/orders/${order.id}`} className="text-muted">
                      Show Details
                    </Link>
                  </td>
                  <td>
                    <Link to={`/admin/orders/update/${order.id}`}>
                      <i
                        className="fas fa-edit"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="my-5" style={{ height: "300px", overflowY: "scroll" }}>
        <table className="table caption-top">
          <caption>List of products</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Selling Price</th>
              <th scope="col">Inventory</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td className="col-2">
                    <img
                      style={{ width: "35%", objectFit: "scale-down" }}
                      src={product.image}
                      alt=""
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>RM {product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Link to={`/admin/product/update/${product.id}`}>
                      <i
                        className="fas fa-edit"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
