import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import dayjs from "dayjs";


export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orders = axios.get(`/api/dashboard/orders`);
    const products = axios.get(`/api/products`);
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
      <div className="row justify-content-end me-2">
        <a href="/admin/product/new" className="col-auto btn btn-primary">
          Add Product
        </a>
      </div>
      <div
        className="my-5 order-list"
        style={{ height: "300px", overflowY: "scroll" }}
      >
        <table className="table caption-top table-striped">
          <caption>List of orders</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order Date</th>
              <th scope="col">Total Paid</th>
              <th scope="col">Order By</th>
              <th scope="col">Shipped</th>
              <th scope="col">Address</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td label="Order Date">
                    {dayjs(order.created_at).format("YYYY-MM-DD hh:mm A")}
                  </td>
                  <td label="Total Paid">RM {calculateTotal(order.content)}</td>
                  <td label="Order By">{order.username}</td>
                  <td label="Shipped">
                    {order.shipped ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        disabled
                      >
                        YES
                      </button>
                    ) : (
                      <button type="button" className="btn btn-danger" disabled>
                        NO
                      </button>
                    )}
                  </td>
                  <td className="col col-xl-5" label="Address">
                    {[
                      order.address_line1,
                      order.address_line2,
                      order.city,
                      order.postal_code,
                      order.country,
                    ].join(", ")}
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

      <div
        className="my-5 product-list"
        style={{ height: "300px", overflowY: "scroll" }}
      >
        <table className="table table-striped caption-top">
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
                  <th className="d-none d-lg-table-cell col-1">
                    <img className="img-fluid" src={product.image} alt="" />
                  </th>
                  <td label="Name">{product.name}</td>
                  <td label="Selling Price">RM {product.price}</td>
                  <td label="Inventory">{product.quantity}</td>
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
