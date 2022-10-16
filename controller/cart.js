const models = require("../models");

const cart = {
  async getUserCart(req, res, next) {
    if (!req.session.userId) return res.end();
    try {
      const cartItems = await models.cart.get(req.session.userId);
      res.status(200).json(cartItems);
    } catch (error) {
      next(error);
    }
  },
  async handleCart(req, res, next) {
    if (!req.session.userId) return res.end();
    try {
      const cart = await models.cart.get(req.session.userId);
      cart ? 
        await models.cart.update(req.session.userId, req.body.cart): 
        await models.cart.create(req.session.userId, req.body.cart);
      res.status(200).json({ message: "Cart Created/Updated Successfully!" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cart;
