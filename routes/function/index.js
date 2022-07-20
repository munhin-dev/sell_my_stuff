const User = require("../../models/User");
const Product = require("../../models/Product");
const Checkout = require("../../models/Checkout");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");

const getOrderById = async (req, res, next) => {
  try {
    const response = await Order.getById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const response = await Order.getAll(req.session.userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const handleCheckout = async (req, res, next) => {
  try {
    const url = await Checkout.createSession(req.body.items, req.session.userId);
    res.json({ url });
  } catch (error) {
    next(error);
  }
};

const handleSuccess = async (req, res, next) => {
  const event = req.body.type;
  if (event === "payment_intent.succeeded") {
    const { id } = req.body.data.object.metadata;
    try {
      await Checkout.handlePayment(id);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
};

const getUserCart = async (req, res, next) => {
  if (!req.session.userId) return;
  try {
    const cartItems = await Cart.get(req.session.userId);
    res.status(200).json(cartItems[0]);
  } catch (error) {
    next(error);
  }
};

const createUpdateCart = async (req, res, next) => {
  if (!req.session.userId) return;
  try {
    await Cart.createUpdate(req.session.userId, req.body.cart);
    res.status(200).json({ message: "Cart Created/Updated Successfully!" });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const products = req.query.category ? await Product.getByCategory(req.query.category) : await Product.getAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.getById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.get(req.session.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const validateSession = async (req, res) => {
  res.status(200).json({ isAuthenticated: Boolean(req.session.userId), isAdmin: req.session.admin });
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.update(req.session.userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    await User.create(req.body);
    res.status(200).json({ message: "Account successfully registered." });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { id, is_admin } = await User.login(req.body);
    req.session.userId = id;
    req.session.admin = is_admin;
    res.status(200).json({ message: "You are logged in!!", isAuthenticated: true, isAdmin: is_admin });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrderById,
  getAllOrder,
  handleCheckout,
  handleSuccess,
  getUserCart,
  createUpdateCart,
  getProduct,
  getProductById,
  getCurrentUser,
  validateSession,
  updateUser,
  registerUser,
  loginUser,
};
