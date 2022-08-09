import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../pages/Loading";
const dayjs = require("dayjs");

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/order").then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const calculateTotal = (arr) => {
    if (orders.length === 0) return 0;
    return JSON.parse(arr).reduce(
      (total, order) => total + order.quantity * order.item.price,
      0
    );
  };

  if (loading) return <Loading />;

  if (orders.length === 0) {
    return (
      <>
        <div className="container my-4">
          <h2 className="my-3">Past Orders</h2>
        </div>
        <div className="container mb-5">
          <div className="card" style={{ width: "100%", height: "25vh" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
              <h4 className="card-title text-center">No order has been made</h4>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container my-4">
        <h2>Past Orders</h2>
      </div>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Order ID#</th>
            <th scope="col">Order Date</th>
            <th scope="col">Total Paid</th>
            <th scope="col">Tracking No.</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <th>{order.id}</th>
                <td label="Order Date">
                  {dayjs(order.created_at).format("YYYY-MM-DD hh:mm A")}
                </td>
                <td label="Total Paid">RM {calculateTotal(order.content)}</td>
                <td label="Tracking No.">
                  {order.tracking_number ? (
                    <a
                      style={{ color: "blue" }}
                      href={`https://tracking.pos.com.my/tracking/${order.tracking_number}`}
                    >
                      {order.tracking_number}
                    </a>
                  ) : (
                    "Pending Shipping"
                  )}
                </td>
                <td>
                  <Link to={`/orders/${order.id}`} className="text-muted">
                    Show Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
