export default function Restricted() {
  return (
    <div className="container my-5">
      <div className="card" style={{ width: "100%", minHeight: "35vh" }}>
        <div className="card-body d-flex align-items-center flex-column justify-content-center">
          <h2 className="card-title text-center">Ops!! You do not have the right to access this page.</h2>
          <br />
          <h5 className="card-text text-center text-muted">Please contact your system administrator for further assistance.</h5>
          <h5 className="card-text text-center text-muted">Thank you for your cooperations.</h5>
        </div>
      </div>
    </div>
  );
}
