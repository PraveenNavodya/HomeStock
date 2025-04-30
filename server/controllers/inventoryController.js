const Inventory = require('../models/Inventory');

// Create Item
exports.createItem = async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json({ message: 'Item created', item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Items
exports.getItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Item updated', item: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
