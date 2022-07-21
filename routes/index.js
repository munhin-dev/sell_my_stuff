const { userValidationRules, validate } = require("../middleware/validator");
const express = require("express");
const app = express.Router();
const cb = require("./function");

app.get("/order/:id", cb.getOrderById);
app.get("/order", cb.getAllOrder);
app.get("/dashboard/orders", cb.getEveryOrder);
app.put("/order/update/:id", cb.updateOrder);

app.post("/checkout", cb.handleCheckout);
app.post("/webhooks", cb.handleSuccess);

app.get("/cart", cb.getUserCart);
app.post("/cart", cb.createUpdateCart);

app.get("/products", cb.getProduct);
app.get("/products/:id", cb.getProductById);
app.put("/products/update/:id", cb.updateInventory);
app.post("/products/create", cb.addNewProduct);

app.get("/users", cb.getCurrentUser);
app.put("/users", cb.updateUser);

app.get("/authenticate", cb.validateSession);
app.post("/register", userValidationRules(), validate, cb.registerUser);
app.post("/login", cb.loginUser);
app.delete("/logout", cb.logoutUser);

module.exports = app;
