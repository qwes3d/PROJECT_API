import Inventory from "./models/inventory.js";
import { validationResult } from "express-validator";

/** GET /api/inventory */
export const getAllinventory = async (req, res, next) => {
  try {
    const items = await Inventory.find().limit(200); // pagination can be added
    res.json(items);
  } catch (err) {
    next(err);
  }
};

/** GET /api/inventory/:id */
export const getInventory = async (req, res, next) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Inventory item not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

/** POST /api/inventory */
export const createInventory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const data = req.body;
    const item = new Inventory(data);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    // handle duplicate key for sku or other validation
    next(err);
  }
};

/** PUT /api/inventory/:id */
export const updateInventory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Inventory item not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/** DELETE /api/inventory/:id */
export const deleteInventory = async (req, res, next) => {
  try {
    const removed = await Inventory.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Inventory item not found" });
    res.json({ message: "Deleted", id: removed._id });
  } catch (err) {
    next(err);
  }
};
