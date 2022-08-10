import React from "react";

export default function Loading() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
