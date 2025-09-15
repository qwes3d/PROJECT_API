const express = require("express");
const Inventory = require("../models/inventory.js");
const { protectJWT, confirmPassword } = require("../middlewares/authMiddleware.js");
const inventoryValidator = require("../middlewares/inventoryValidator.js");
const { validationResult } = require("express-validator");

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// CREATE
router.post("/", protectJWT, confirmPassword, inventoryValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, description, category, model, manufacturer, supplier, price } = req.body;
  try {
    const newItem = new Inventory({ name, description, category, model, manufacturer, supplier, price });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", protectJWT, confirmPassword, inventoryValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    Object.assign(item, req.body);
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", protectJWT, confirmPassword, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
