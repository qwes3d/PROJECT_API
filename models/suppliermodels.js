// models/supplier.js
const mongoose = require("mongoose");
const Counter = require("./counter");

const supplierSchema = new mongoose.Schema({
  supplierId: { type: String, unique: true }, // SUP-001
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// Auto-generate supplierId
supplierSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "supplier" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.supplierId = `SUP-${String(counter.seq).padStart(3, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Supplier", supplierSchema);
