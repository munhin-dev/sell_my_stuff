import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, PrivateRoute } from "../routes";
import { Dashboard, Loading, Success } from "../pages";
import Layout from "../layout";
import Account from "../components/Account";
import Cart from "../components/Cart";
import { Order, Orders } from "../components/Orders";
import { Product, Products } from "../components/Products";
import * as Form from "../components/Forms";
import Cookies from "js-cookie";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(JSON.parse(Cookies.get("login") || null));
  const [admin, setAdmin] = useState(JSON.parse(Cookies.get("admin") | null));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/products").then(({ data }) => {
      setProducts(data);
      setLoading(false);
    });
    axios.get("/api/cart").then(({ data }) => setCart(JSON.parse(data.content)));
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
            <Route path="/signin" element={<Form.Login onLogin={handleUser} onAdmin={handleAdmin} />} />
            <Route path="/signup" element={<Form.Registration onLogin={handleUser} />} />
            <Route path="/success" element={<Success />} />

            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/account" element={<Account onLogout={handleUser} />} />
              <Route path="/account/address/edit" element={<Form.EditAddress />} />
              <Route path="/account/user/edit" element={<Form.EditUser />} />
              <Route path="/checkout" element={<Cart cart={cart} user={user} onCart={handleCart} />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<Order />} />
            </Route>

            <Route element={<PrivateRoute admin={admin} />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/orders/update/:id" element={<Form.UpdateShipping />} />
              <Route path="/admin/product/update/:id" element={<Form.UpdateProduct />} />
              <Route path="/admin/product/new" element={<Form.NewProduct />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
