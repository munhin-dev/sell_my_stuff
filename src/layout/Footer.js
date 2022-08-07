import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="https://www.facebook.com/" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.google.com/" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="https://www.instagram.com/?hl=en" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Sell My Stuff
                </h6>
                <p>This is a personal website dedicated for selling personal belonging of Mun Hin.</p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <Link to="games" className="text-reset">
                    Video Games
                  </Link>
                </p>
                <p>
                  <Link to="appliances" className="text-reset">
                    Home Appliances
                  </Link>
                </p>
                <p>
                  <Link to="dvd" className="text-reset">
                    Music and DVD
                  </Link>
                </p>
                <p>
                  <Link to="instruments" className="text-reset">
                    Musical Instruments
                  </Link>
                </p>
                <p>
                  <Link to="books" className="text-reset">
                    Books
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link to="cart" className="text-reset">
                    Bag
                  </Link>
                </p>
                <p>
                  <Link to="orders" className="text-reset">
                    Order History
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> Subang Jaya, Selangor 47610, MY
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  info@sellmystuff.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 6016-8115967
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">© 2022 Copyright: Sell My Stuff.com</div>
      </footer>
    </div>
  );
}
