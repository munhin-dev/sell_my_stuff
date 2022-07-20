const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("first_name", "No special characters allowed for first name")
      .trim()
      .isAlpha(undefined, {
        ignore: " ",
      })
      .isLength({ max: 64 }),
    body("last_name", "No special characters allowed for last name")
      .trim()
      .isAlpha(undefined, {
        ignore: " ",
      })
      .isLength({ max: 64 }),
    body("username", "Only alphanumeric characters allowed for username")
      .trim()
      .isAlphanumeric(undefined, {
        ignore: "_-",
      })
      .isLength({ max: 32 }),
    body("password", "Password must be at least 5 characters long and contain one uppercase letters and one special case letter").isStrongPassword({
      minLength: 5,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 1,
    }),
    body("email", "Invalid email address provided").isEmail(),
    body("mobile", "Mobile number is invalid").isMobilePhone(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  throw extractedErrors;
};

module.exports = {
  userValidationRules,
  validate,
};
