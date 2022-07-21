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
import ProductForm from "./ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(Cookies.get("login") === "true");
  const [admin, setAdmin] = useState(Cookies.get("admin") === "true");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/products").then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
    axios.get("/cart").then(({ data }) => setCart(JSON.parse(data.content)));
    axios.get("/authenticate").then(({ data: { isLoggedIn, isAdmin } }) => {
      setUser(isLoggedIn);
      setAdmin(isAdmin);
      if (!isLoggedIn) {
        Cookies.remove("login");
        Cookies.remove("admin");
      }
    });
  }, []);

  useEffect(() => {
    axios.post("/cart", { cart: JSON.stringify(cart) });
  }, [cart]);

  const handleLogin = (status) => setUser(status);
  const handleAdmin = (status) => setAdmin(status);
  const handleCart = (cart) => setCart(cart);
  const filter = (id) =>
    products.filter((product) => product.category_id === id);

  if (loading) return <Loading />;

  return (
    <div className="App">
      <Router>
        <Layout user={user} cart={cart}>
          <Routes>
            <Route
              path="/"
              element={<Products products={products} title={"All"} />}
            />
            <Route
              path="/games"
              element={<Products products={filter(1)} title={"Video Games"} />}
            />
            <Route
              path="/appliances"
              element={
                <Products products={filter(2)} title={"Home Appliances"} />
              }
            />
            <Route
              path="/dvd"
              element={
                <Products products={filter(3)} title={"Music and DVD"} />
              }
            />
            <Route
              path="/instruments"
              element={
                <Products products={filter(4)} title={"Musical Instruments"} />
              }
            />
            <Route
              path="/books"
              element={<Products products={filter(5)} title={"Books"} />}
            />
            <Route
              path="/product/:id"
              element={<Product onCart={handleCart} cart={cart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} user={user} onCart={handleCart} />}
            />
            <Route
              path="/signin"
              element={<Login onLogin={handleLogin} onAdmin={handleAdmin} />}
            />
            <Route path="/success" element={<Success />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/account" element={<Account />} />
              <Route
                path="/checkout"
                element={<Cart cart={cart} user={user} onCart={handleCart} />}
              />
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
