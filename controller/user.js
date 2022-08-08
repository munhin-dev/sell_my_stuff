const models = require("../models");
const bcrypt = require("bcryptjs");

const user = {
  async createUser(req, res, next) {
    try {
      await models.user.create(req.body);
      res.status(200).json({ message: "Account successfully registered." });
    } catch (error) {
      next(error);
    }
  },
  async getCurrentUser(req, res, next) {
    try {
      const user = await models.user.getById(req.session.userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  async updateCurrentUser(req, res, next) {
    try {
      const userId = req.session.userId;
      const { first_name, last_name, mobile } = req.body;
      await models.user.update(first_name, last_name, mobile, userId);
      res.status(200).json({ message: "Account update successfully." });
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const users = await models.user.getByUsername(username);
      if (!users) throw new Error("Invalid username or password");
      const matched = await bcrypt.compare(password, users.password);
      if (!matched) throw new Error("Invalid username or password");
      req.session.userId = users.id;
      req.session.admin = users.is_admin;
      res.status(200).json({ message: "User authenticated!!" });
    } catch (error) {
      next(error);
    }
  },
  async logout(req, res, next) {
    try {
      req.session.destroy();
      res.status(200).json({ message: "User Logged Out." });
    } catch (error) {
      next(error);
    }
  },
  async authenticate(req, res) {
    res.status(200).json({
      isLoggedIn: Boolean(req.session.userId),
      isAdmin: Boolean(req.session.admin),
    });
  },
};

module.exports = user;
