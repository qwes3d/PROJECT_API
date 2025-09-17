const { body } = require("express-validator");

const createSupplierValidation = [
  body("name")
    .notEmpty()
    .withMessage("Supplier name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required"),
  body("address")
    .notEmpty()
    .withMessage("Address is required"),
];

// For updates – fields optional, but if provided must be valid
const updateSupplierValidation = [
  body("name").optional().notEmpty().withMessage("Supplier name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("phone").optional().notEmpty().withMessage("Phone number cannot be empty"),
  body("address").optional().notEmpty().withMessage("Address cannot be empty"),
];

module.exports = {
  createSupplierValidation,
  updateSupplierValidation,
};
