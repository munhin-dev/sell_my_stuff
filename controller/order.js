const models = require("../models");

const order = {
  async getOneByOrderId(req, res, next) {
    try {
      const response = await models.order.getOneById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  async getAllForOneCustomer(req, res, next) {
    try {
      const response = await models.order.getAllByCustomerId(req.session.userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  async getEveryOrder(req, res, next) {
    try {
      const response = await models.order.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  async updateOrder(req, res, next) {
    try {
      await models.order.update(req.body.tracking_number, req.body.shipped, req.params.id);
      res.status(200).json({ message: "Shipping Information Updated Successfully!" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = order;
