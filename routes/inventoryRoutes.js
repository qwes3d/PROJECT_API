// routes/inventoryRoutes.js
const express = require("express");
const { protectJWT, confirmPassword } = require("../middlewares/authMiddleware.js");
const  inventoryValidator  = require("../middlewares/inventoryValidator.js");
const { validationResult } = require("express-validator");
const inventoryController = require("../controllers/InvController.js");

const router = express.Router();

// GET ALL - public
router.get("/", inventoryController.getAllInventory);

// GET ONE - public
router.get("/:id", inventoryController.getInventoryById);

// CREATE - protected + confirm password + validation
router.post(
  "/",
  protectJWT,
  inventoryValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Call confirmPassword first, then controller
    await confirmPassword(req, res, () => inventoryController.createInventory(req, res));
  }
);

// UPDATE - protected + confirm password + validation
router.put(
  "/:id",
  protectJWT,
  inventoryValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    await confirmPassword(req, res, () => inventoryController.updateInventory(req, res));
  }
);

// DELETE - protected + confirm password
router.delete(
  "/:id",
  protectJWT,
  async (req, res, next) => {
    await confirmPassword(req, res, () => inventoryController.deleteInventory(req, res));
  }
);

module.exports = router;
