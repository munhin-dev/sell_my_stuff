import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "../utils/ProtectedRoute";
import PrivateRoute from "../utils/PrivateRoute";
import HeaderFooter from "../utils/HeaderFooter";
import Account from "./Account";
import Cart from "./Cart";
import Loading from "./Loading";
import Login from "./Login";
import Order from "./Order";
import Orders from "./Orders";
import Product from "./Product";
import Success from "./Success";
import Products from "./Products";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/products").then(({ data }) => setProducts(data));
    axios.get("/cart").then(({ data }) => setCart(JSON.parse(data.content)));
    axios.get("/authenticate").then(({ data: { isAuthenticated, isAdmin } }) => {
      setUser(isAuthenticated);
      setAdmin(isAdmin);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.post("/cart", { cart: JSON.stringify(cart) });
  }, [cart]);

  const handleSignin = (status) => setUser(status);
  const handleCart = (cart) => setCart(cart);
  const filter = (id) => products.filter((product) => product.category_id === id);

  if (loading) return <Loading />;

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderFooter user={user} cart={cart}>
          <Routes>
            <Route path="/" element={<Products products={products} title={"All"} />} />
            <Route path="/games" element={<Products products={filter(1)} title={"Video Games"} />} />
            <Route path="/appliances" element={<Products products={filter(2)} title={"Home Appliances"} />} />
            <Route path="/dvd" element={<Products products={filter(3)} title={"Music and DVD"} />} />
            <Route path="/instruments" element={<Products products={filter(4)} title={"Musical Instruments"} />} />
            <Route path="/books" element={<Products products={filter(5)} title={"Books"} />} />
            <Route path="/product/:id" element={<Product onCart={handleCart} cart={cart} />} />
            <Route path="/cart" element={<Cart cart={cart} user={user} onCart={handleCart} />} />
            <Route path="/signin" element={user ? <Navigate to="/" /> : <Login onSignin={handleSignin} />} />
            <Route path="/success" element={<Success />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Cart cart={cart} signin={user} onCart={handleCart} />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<Order />} />
            </Route>
            <Route element={<PrivateRoute admin={admin} />}>
              <Route path="/admin" element={<Account />} />
            </Route>
          </Routes>
        </HeaderFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;
