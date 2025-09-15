// middlewares/inventoryValidator.js
const { body } = require("express-validator");

const inventoryValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("model").notEmpty().withMessage("Model is required"),
  body("manufacturer").notEmpty().withMessage("Manufacturer is required"),
  body("supplier").notEmpty().withMessage("Supplier is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
];

module.exports = inventoryValidator;
