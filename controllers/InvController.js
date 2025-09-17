const Inventory = require("../models/inventory");
const Supplier = require("../models/suppliermodels");

// Create inventory item
exports.createInventory = async (req, res) => {
  try {
    const { supplier, ...rest } = req.body;

    // Validate supplier exists
    const supplierExists = await Supplier.findById(supplier);
    if (!supplierExists)
      return res.status(404).json({ success: false, message: "Supplier not found" });

    const item = new Inventory({ ...rest, supplier });
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all inventory items
exports.getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find().populate("supplier", "name email phone");
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get one inventory item
exports.getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate(
      "supplier",
      "name email phone"
    );
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update inventory
exports.updateInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete inventory
exports.deleteInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
