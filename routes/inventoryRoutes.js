// routes/inventoryRoutes.js
const express = require("express");
const { protectJWT } = require("../middlewares/authMiddleware.js");
const inventoryValidator = require("../middlewares/inventoryValidator.js");
const { validationResult } = require("express-validator");
const inventoryController = require("../controllers/InvController.js");

const router = express.Router();

// ✅ Apply JWT globally


// GET ALL
router.get("/", protectJWT, inventoryController.getAllInventory);

// GET ONE
router.get("/:id",protectJWT, inventoryController.getInventoryById);

// CREATE
router.post("/", protectJWT, inventoryValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  inventoryController.createInventory(req, res);
});

// UPDATE
router.put("/:id", protectJWT, inventoryValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  inventoryController.updateInventory(req, res);
});

// DELETE
router.delete("/:id", protectJWT, inventoryController.deleteInventory);

module.exports = router;
