import React from "react";

export default function NotFound() {
  return (
    <div className="container my-5">
      <div className="card" style={{ width: "100%", minHeight: "35vh" }}>
        <div className="card-body d-flex align-items-center flex-column justify-content-center">
          <h2 className="card-title text-center">Ops!! 404 Page not found.</h2>
          <br />
          <h5 className="card-text text-center text-muted">Uh oh, we can't seem to find the page that you're looking for. Try going back to the previous page or contact support for more information</h5>
          <h5 className="card-text text-center text-muted">Thank you for your cooperations.</h5>
        </div>
      </div>
    </div>
  );
}
