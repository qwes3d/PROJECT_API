// controllers/supplierController.js
const Supplier = require("../models/suppliermodels");

// Generate Supplier ID (SUP-001)
async function generateSupplierId() {
  const count = await Supplier.countDocuments();
  return `SUP-${String(count + 1).padStart(3, "0")}`;
}

// Create Supplier
exports.createSupplier = async (req, res) => {
  try {
    const supplierId = await generateSupplierId();
    const supplier = new Supplier({ ...req.body, supplierId });
    await supplier.save();
    res.status(201).json({ success: true, data: supplier });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find(); // no populate
    res.status(200).json({ success: true, count: suppliers.length, data: suppliers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get One Supplier
exports.getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id); // no populate
    if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found" });
    res.status(200).json({ success: true, data: supplier });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Supplier
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found" });
    res.status(200).json({ success: true, data: supplier });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found" });

    await supplier.deleteOne();
    res.status(200).json({ success: true, message: "Supplier deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
