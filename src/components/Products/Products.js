import { Link } from "react-router-dom";

export default function Products({ products }) {
  const pathname = window.location.pathname.slice(1);
  const getCategory = (path) => {
    const category = {
      games: { name: "Video Games", id: 1 },
      appliances: { name: "Home Appliances", id: 2 },
      dvd: { name: "Music and DVD", id: 3 },
      instruments: { name: "Musical Instruments", id: 4 },
      books: { name: "Books", id: 5 },
    };
    return category[path];
  };

  return (
    <div>
      <div className="container my-3">
        <div className="row">
          <h2>{"All" || getCategory(pathname)?.name}</h2>
        </div>
        <div className="row row-cols-auto justify-content-center justify-content-md-start">
          {products
            .filter((product) => {
              const category = getCategory(pathname);
              return category ? product.quantity > 0 && product.category_id === getCategory(pathname)?.id : product.quantity > 0;
            })
            .map((product) => {
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
