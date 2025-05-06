const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  fixedIncome: {
    type: Number,
    required: true, // This is the correct way to set a required field
  },
  otherIncome: {
    type: Number,
    required: true, // Add required: true here if the field is mandatory
  },
  targetSavings: {
    type: Number,
    required: true, // Default value if not provided
  },
}); 

module.exports = mongoose.model('Income', incomeSchema);
