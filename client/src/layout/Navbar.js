import React from "react";
import homeButton from "../assets/home_button.png";
import { Link } from "react-router-dom";

export default function Navbar({ signin, cart }) {
  const totalItems = () => cart.reduce((total, { quantity }) => total + quantity, 0);
  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={homeButton} width="180" height="40" alt="Home" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="games" className="nav-link">
                Video Games
              </Link>
            </li>
            <li className="nav-item">
              <Link to="appliances" className="nav-link">
                Home Appliances
              </Link>
            </li>
            <li className="nav-item">
              <Link to="dvd" className="nav-link">
                Music and DVD
              </Link>
            </li>
            <li className="nav-item">
              <Link to="instruments" className="nav-link">
                Musical Instruments
              </Link>
            </li>
            <li className="nav-item">
              <Link to="books" className="nav-link">
                Books
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav  ms-auto">
            <li className="nav-item">
              <Link to="orders" className="nav-link">
                <i className="d-none d-xl-inline fa fa-history mx-1" aria-hidden="true"></i>
                Order History
              </Link>
            </li>
            <li className="nav-item">
              <Link to="cart" className="nav-link position-relative">
                <i className="d-none d-xl-inline fa fa-shopping-bag mx-1" aria-hidden="true">
                  {cart.length > 0 && (
                    <span
                      className="position-absolute translate-middle badge rounded-pill text-bg-secondary"
                      style={{
                        left: "10px",
                        top: "10px",
                        fontSize: "0.5rem",
                      }}
                    >
                      {totalItems()}
                    </span>
                  )}
                </i>
                Bag
              </Link>
            </li>
            <li className="nav-item">
              {signin ? (
                <Link to="account" className="nav-link">
                  <i className="d-none d-xl-inline fa fa-user mx-1" aria-hidden="true"></i>
                  Account
                </Link>
              ) : (
                <Link to="signin" className="nav-link">
                  <i className="d-none d-xl-inline fa fa-sign-in mx-1" aria-hidden="true"></i>
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
