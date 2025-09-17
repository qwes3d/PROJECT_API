const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierId: { type: String, unique: true },
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String
}, { timestamps: true });

module.exports = mongoose.model("Supplier", supplierSchema);
