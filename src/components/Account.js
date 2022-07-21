import axios from "axios";
import { useState, useEffect } from "react";

export default function Account() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios.get("/users").then(({ data }) => {
      setUserInfo(data);
    });
  }, []);

  const handleLogout = () => {
    axios.delete("/logout").then(() => (window.location.href = "/"));
  };

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-center mt-3">
        <div className="card m-4" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title">Account Information</h5>
            <p className="card-text">Username: {userInfo.user?.username}</p>
            <p className="card-text">Email: {userInfo.user?.email}</p>
            <p className="card-text">First Name: {userInfo.user?.first_name}</p>
            <p className="card-text">Last Name: {userInfo.user?.last_name}</p>
            <p className="card-text">Mobile: {userInfo.user?.mobile}</p>
            <button type="button" className="btn btn-primary">
              Update Info
            </button>
          </div>
        </div>
        <div className="card m-4" style={{ width: "25rem" }}>
          <div className="card-body">
            <h5 className="card-title">Address Information</h5>
            <p className="card-text">Address Line 1: {userInfo.address?.address_line1}</p>
            <p className="card-text">Address Line 2: {userInfo.address?.address_line2}</p>
            <p className="card-text">City: {userInfo.address?.city}</p>
            <p className="card-text">Postal Code: {userInfo.address?.postal_code}</p>
            <p className="card-text">Country: {userInfo.address?.country}</p>
            <button type="button" className="btn btn-primary">
              Update Address
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mb-5">
        <button type="button" className=" col-auto btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
