const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const userValidationRules = () => {
  return [
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("Invalid first name provided")
      .isAlpha(undefined, {
        ignore: " ",
      })
      .withMessage("No special characters allowed for first name")
      .isLength({ max: 64 })
      .withMessage("Username cannot be longer than 64 characters"),
    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Invalid first last name provided")
      .isAlpha(undefined, {
        ignore: " ",
      })
      .withMessage("No special characters allowed for last name")
      .isLength({ max: 64 }),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Invalid username provided")
      .isAlphanumeric(undefined, {
        ignore: "_-",
      })
      .withMessage("Only alphanumeric characters allowed for username")
      .isLength({ max: 32 })
      .withMessage("Username cannot be longer than 32 characters")
      .custom(async (value) => {
        const user = await User.getByUsername(value);
        if (user) {
          return Promise.reject("Username already in use");
        }
      }),
    body("password", "Password does not meet minimum requirements").isStrongPassword({
      minLength: 5,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 1,
    }),
    body("email", "Invalid email address provided")
      .isEmail()
      .custom(async (value) => {
        const user = await User.getByEmail(value);
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      }),
    body("mobile", "Mobile number is invalid").isMobilePhone(),
  ];
};

const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  throw result.errors;
};

module.exports = {
  userValidationRules,
  validate,
};
