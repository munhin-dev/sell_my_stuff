const models = require("../models");

const address = {
  async getUserAddress(req, res, next) {
    try {
      const address = await models.address.getByCustomerId(req.session.userId);
      res.status(200).json(address);
    } catch (error) {
      next(error);
    }
  },
  async updateUserAddress(req, res, next) {
    try {
      const customerId = req.session.userId;
      const { address_line1, address_line2, city, postal_code, country } = req.body;
      await models.address.update(customerId, address_line1, address_line2, city, postal_code, country);
      res.status(200).json({ message: "Address Updated Successfully!" });
    } catch (error) {
      next(error);
    }
  },
  async createUserAddress(req, res, next) {
    try {
      const customerId = req.session.userId;
      const { address_line1, address_line2, city, postal_code, country } = req.body;
      await models.address.create(customerId, address_line1, address_line2, city, postal_code, country);
      res.status(200).json({ message: "Address Created Successfully!" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = address;
