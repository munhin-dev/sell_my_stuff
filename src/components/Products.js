import { Link } from "react-router-dom";

export default function Products({ products, title }) {
  return (
    <div>
      <div className="container my-3">
        <h2>{title}</h2>
      </div>
      <div className="container my-3 products">
        <div className="row row-cols-auto justify-content-center justify-content-md-start">
          {products.map((product) => {
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="card my-3" style={{ width: "18rem" }}>
                  <img src={product.image} className="card-img-top p-4" alt="" style={{ height: "15rem", objectFit: "scale-down" }} />
                  <div className="card-body" style={{ height: "8rem" }}>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{`RM ${product.price}`}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
