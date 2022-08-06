const { userValidationRules, validate } = require("../middleware/validator");
const express = require("express");
const app = express.Router();
const controller = require("../controller");

app.get("/order/:id", controller.order.getOneByOrderId);
app.get("/order", controller.order.getAllForOneCustomer);
app.get("/dashboard/orders", controller.order.getEveryOrder);
app.put("/order/update/:id", controller.order.updateOrder);

app.post("/checkout", controller.checkout.handleCheckout);
app.post("/webhooks", controller.checkout.handleSuccess);

app.get("/cart", controller.cart.getUserCart);
app.post("/cart", controller.cart.handleCart);

app.post("/products/new", controller.product.create);
app.get("/products/:id", controller.product.getById);
app.put("/products/update/:id", controller.product.update);
app.get("/products", controller.product.get);

app.post("/register", userValidationRules(), validate, controller.user.create);
app.get("/users", controller.user.get);
app.put("/users", controller.user.update);

app.get("/authenticate", controller.user.authenticate);
app.post("/login", controller.user.login);
app.delete("/logout", controller.user.logout);

module.exports = app;
