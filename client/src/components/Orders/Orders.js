import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../pages/Loading";
import domain from "../../utils";
const dayjs = require("dayjs");

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${domain}/api/order`).then(({ data }) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const calculateTotal = (arr) => {
    if (orders.length === 0) return 0;
    return JSON.parse(arr).reduce((total, order) => total + order.quantity * order.item.price, 0);
  };

  if (loading) return <Loading />;

  return (
    <div className="container my-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Order ID#</th>
            <th scope="col">Order Date</th>
            <th scope="col">Total Paid</th>
            <th scope="col">Tracking Number</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <th scope="row">{order.id}</th>
                <td>{dayjs(order.created_at).format("YYYY-MM-DD hh:mm A")}</td>
                <td>RM {calculateTotal(order.content)}</td>
                <td>
                  {order.tracking_number ? (
                    <a style={{ color: "blue" }} href={`https://tracking.pos.com.my/tracking/${order.tracking_number}`}>
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
    </div>
  );
}
