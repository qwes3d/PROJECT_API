// routes/supplierRoutes.js
const express = require("express");
const router = express.Router();

const suppliercontrollers = require("../controllers/suppliercontrollers");
const { protectJWT } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const {
  createSupplierValidation,
  updateSupplierValidation
} = require("../middlewares/suppliervalidation");

// ✅ Apply JWT globally for all supplier routes


// GET all suppliers
router.get("/", protectJWT, suppliercontrollers.getSuppliers);

// CREATE supplier
router.post(
  "/",
  protectJWT,
  createSupplierValidation,
  validationHandler,
  suppliercontrollers.createSupplier
);

// UPDATE supplier
router.put(
  "/:id",
  protectJWT,
  updateSupplierValidation,
  validationHandler,
  suppliercontrollers.updateSupplier
);

// DELETE supplier
router.delete("/:id", protectJWT, suppliercontrollers.deleteSupplier);

module.exports = router;
