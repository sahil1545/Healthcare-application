const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usage: { type: String, required: true },
  dosage: { type: String, required: true },
  sideEffects: { type: [String] },
  warnings: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
