const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Patient', 'Doctor', 'Admin'], default: 'Patient' },
  // Doctor specific fields
  specialization: { type: String },
  experience: { type: Number },
  consultationFee: { type: Number },
  availability: { type: [String] }, // e.g. ["Monday", "Wednesday"]
  ratings: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
