const { userValidationRules, addressValidationRules, validate } = require("../middleware/validator");
const express = require("express");
const app = express.Router();
const controller = require("../controller");

app.get("/api/order/:id", controller.order.getOneByOrderId);
app.put("/api/order/update/:id", controller.order.updateOrderById);
app.get("/api/dashboard/orders", controller.order.getAllOrders);
app.get("/api/order", controller.order.getUserOrders);

app.post("/api/checkout", controller.checkout.handleCheckout);
app.post("/api/webhooks", controller.checkout.handleSuccess);

app.get("/api/cart", controller.cart.getUserCart);
app.post("/api/cart", controller.cart.handleCart);

app.get("/api/products", controller.product.getAllProducts);
app.post("/api/products/new", controller.product.createProduct);
app.put("/api/products/update/:id", controller.product.updateProductById);
app.get("/api/products/:id", controller.product.getOneByProductId);

app.get("/api/address", controller.address.getUserAddress);
app.post("/api/address", addressValidationRules(), validate, controller.address.createUserAddress);
app.put("/api/address", addressValidationRules(), validate, controller.address.updateUserAddress);

app.post("/api/register", userValidationRules(), validate, controller.user.createUser);
app.get("/api/users", controller.user.getCurrentUser);
app.put("/api/users", controller.user.updateCurrentUser);

app.get("/api/authenticate", controller.user.authenticate);
app.post("/api/login", controller.user.login);
app.delete("/api/logout", controller.user.logout);

module.exports = app;
