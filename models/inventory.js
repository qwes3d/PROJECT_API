const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, required: true },
  model: { type: String },            // MODEL
  manufacturer: { type: String },     // MANUFACTURER
  supplier: { type: String },         // SUPPLIER
  price: { type: Number, required: true, min: 0 }, // PRICE
  quantity: { type: Number, default: 0 },
  sku: { type: String, unique: true, sparse: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", inventorySchema, "AKI");
