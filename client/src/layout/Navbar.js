import React from "react";
import homeButton from "../assets/home_button.png";
import { Link } from "react-router-dom";

export default function Navbar({ user, cart }) {
  const totalItems = () =>
    cart.reduce((total, { quantity }) => total + quantity, 0);
  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={homeButton} width="180" height="40" alt="Home" />
        </Link>
        <ul className="d-xl-none navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="cart" className="nav-link position-relative">
              <i className="fa fa-shopping-bag mx-1" aria-hidden="true">
                {cart.length > 0 && (
                  <span
                    className="position-absolute translate-middle badge rounded-pill text-bg-secondary"
                    style={{
                      left: "2px",
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
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="games" className="nav-link">
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Video Games
              </li>
            </Link>
            <Link to="appliances" className="nav-link">
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Home Appliances
              </li>
            </Link>
            <Link to="dvd" className="nav-link">
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Music and DVD
              </li>
            </Link>
            <Link to="instruments" className="nav-link">
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Musical Instruments
              </li>
            </Link>
            <Link to="books" className="nav-link">
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Books
              </li>
            </Link>
          </ul>

          <ul className="navbar-nav  ms-auto">
            <Link to="orders" className="nav-link">
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                <i
                  className="d-none d-xl-inline fa fa-history mx-1"
                  aria-hidden="true"
                ></i>
                Order History
              </li>
            </Link>
            <Link
              to="cart"
              className=" d-none d-xl-inline nav-link position-relative"
            >
              <li className="nav-item">
                <i className="fa fa-shopping-bag mx-1" aria-hidden="true">
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
              </li>
            </Link>

            {user ? (
              <Link to="account" className="nav-link">
                <li
                  className="nav-item"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  <i
                    className="d-none d-xl-inline fa fa-user mx-1"
                    aria-hidden="true"
                  ></i>
                  Account
                </li>
              </Link>
            ) : (
              <Link to="signin" className="nav-link">
                <li
                  className="nav-item"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  <i
                    className="d-none d-xl-inline fa fa-sign-in  mx-1"
                    aria-hidden="true"
                  ></i>
                  Sign In
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
