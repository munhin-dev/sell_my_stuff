import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "../utils/ProtectedRoute";
import PrivateRoute from "../utils/PrivateRoute";
import Layout from "../utils/Layout";
import Account from "./Account";
import Cart from "./Cart";
import Loading from "./Loading";
import Login from "./Login";
import Order from "./Order";
import Orders from "./Orders";
import Product from "./Product";
import Success from "./Success";
import Products from "./Products";
import Dashboard from "./Dashboard";
import Shipping from "./Shipping";
import Cookies from "js-cookie";
import Inventory from "./Inventory";
import Signup from "./Signup";
import ProductForm from "./NewProduct";
import Address from "./Address"

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(Cookies.get("login") === "true");
  const [admin, setAdmin] = useState(Cookies.get("admin") === "true");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/products").then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
    axios
      .get("/api/cart")
      .then(({ data }) => setCart(JSON.parse(data.content)));
    axios.get("/api/authenticate").then(({ data: { isLoggedIn, isAdmin } }) => {
      setUser(isLoggedIn);
      setAdmin(isAdmin);
      if (!isLoggedIn) {
        Cookies.remove("login");
        Cookies.remove("admin");
      }
    });
  }, []);

  useEffect(() => {
      axios.post("/api/cart", { cart: JSON.stringify(cart) });
  }, [cart]);

  const handleUser = (status) => setUser(status);
  const handleAdmin = (status) => setAdmin(status);
  const handleCart = (cart) => setCart(cart);

  if (loading) return <Loading />;

  return (
    <div className="App">
      <Router>
        <Layout user={user} cart={cart}>
          <Routes>
            {["/", "/games", "/appliances", "/dvd", "/instruments", "/books"].map((path, index) => (
              <Route key={index} path={path} element={<Products products={products} />} />
            ))}
            <Route path="/product/:id" element={<Product onCart={handleCart} cart={cart} />} />
            <Route path="/cart" element={<Cart cart={cart} user={user} onCart={handleCart} />} />
            <Route path="/signin" element={<Login onLogin={handleUser} onAdmin={handleAdmin} />} />
            <Route path="/signup" element={<Signup onLogin={handleUser} />} />
            <Route path="/success" element={<Success />} />

            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/account" element={<Account onLogout={handleUser}/> } />
              <Route path="/account/address/edit" element={<Address />} />
              <Route path="/account/user/edit" element={<Address />} />
              <Route path="/checkout" element={<Cart cart={cart} user={user} onCart={handleCart} />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<Order />} />
            </Route>

            <Route element={<PrivateRoute admin={admin} />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/orders/update/:id" element={<Shipping />} />
              <Route path="/admin/product/update/:id" element={<Inventory />} />
              <Route path="/admin/product/new" element={<ProductForm />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
