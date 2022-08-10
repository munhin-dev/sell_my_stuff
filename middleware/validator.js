const { body, validationResult } = require("express-validator");
const models = require("../models");

const addressRules = [
  body("address_line1").trim().notEmpty(),
  body("city").trim().notEmpty(),
  body("postal_code")
    .trim()
    .notEmpty()
    .isPostalCode("MY")
    .withMessage("Invalid postal code provided"),
  body("country").trim().notEmpty().equals("Malaysia"),
];

const registrationRules = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("Invalid value provided")
    .isAlpha(undefined, {
      ignore: " ",
    })
    .withMessage("No special characters allowed")
    .isLength({ max: 64 })
    .withMessage("Username is too long"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Invalid value provided")
    .isAlpha(undefined, {
      ignore: " ",
    })
    .withMessage("No special characters allowed")
    .isLength({ max: 64 }),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Invalid username provided")
    .isAlphanumeric(undefined, {
      ignore: "_-",
    })
    .withMessage("Only alphanumeric characters allowed")
    .isLength({ max: 32 })
    .withMessage("Username is too long")
    .custom(async (value) => {
      const oldUser = await models.user.getByUsername(value);
      if (oldUser) return Promise.reject("Username already in use");
    }),
  body("password", "Invalid value provided")
    .isStrongPassword({
      minLength: 5,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 1,
    })
    .withMessage("Password is too weak"),
  body("email", "Invalid email address provided")
    .isEmail()
    .custom(async (value) => {
      const oldUser = await models.user.getByEmail(value);
      if (oldUser) return Promise.reject("E-mail already in use");
    }),
  body("mobile", "Mobile number is invalid").isMobilePhone(),
];

const userInfoRules = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("Invalid first name provided")
    .isAlpha(undefined, {
      ignore: " ",
    })
    .withMessage("No special characters allowed")
    .isLength({ max: 64 })
    .withMessage("Username is too long"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Invalid first last name provided")
    .isAlpha(undefined, {
      ignore: " ",
    })
    .withMessage("No special characters allowed")
    .isLength({ max: 64 }),
  body("mobile", "Mobile number is invalid").isMobilePhone(),
];

const validationRules = (type) => {
  if (type === "address") return addressRules;
  if (type === "register") return registrationRules;
  if (type === "userInfo") return userInfoRules;
};

const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  throw new Error("validation failed", { cause: result.errors });
};

module.exports = { validationRules, validate };
