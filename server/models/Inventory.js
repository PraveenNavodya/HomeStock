const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  date: String,
  price: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);
