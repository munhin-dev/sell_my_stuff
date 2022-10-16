export default function Success() {
  return (
    <div className="container my-5">
      <div className="card" style={{ width: "100%", minHeight: "35vh" }}>
        <div className="card-body d-flex align-items-center flex-column justify-content-center">
          <h2 className="card-title text-center">Thank you for purchasing with Sell My Stuff.</h2>
          <br />
          <h5 className="card-text text-center text-muted">Your payment has been successfully processed.</h5>
          <h5 className="card-text text-center text-muted">Please allow two to three days for item to be shipped.</h5>
        </div>
      </div>
    </div>
  );
}
