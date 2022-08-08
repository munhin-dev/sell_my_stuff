const models = require("../models");

const order = {
  async getOneByOrderId(req, res, next) {
    try {
      const response = await models.order.getOneById(req.params.id);
      if (response.customer_id !== req.session.userId && !req.session.admin) throw new Error("unauthorized access");
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  async getUserOrders(req, res, next) {
    try {
      const response = await models.order.getAllByCustomerId(req.session.userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  async getAllOrders(req, res, next) {
    try {
      const response = await models.order.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  async updateOrderById(req, res, next) {
    try {
      await models.order.update(req.body.tracking_number, req.body.shipped, req.params.id);
      res.status(200).json({ message: "Shipping Information Updated Successfully!" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = order;
