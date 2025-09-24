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
router.use(protectJWT);

// GET all suppliers
router.get("/", suppliercontrollers.getSuppliers);

// CREATE supplier
router.post(
  "/",
  createSupplierValidation,
  validationHandler,
  suppliercontrollers.createSupplier
);

// UPDATE supplier
router.put(
  "/:id",
  updateSupplierValidation,
  validationHandler,
  suppliercontrollers.updateSupplier
);

// DELETE supplier
router.delete("/:id", suppliercontrollers.deleteSupplier);

module.exports = router;
