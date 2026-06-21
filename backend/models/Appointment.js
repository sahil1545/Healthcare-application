const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g. "10:00 AM - 10:30 AM"
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  notes: { type: String },
  videoLink: { type: String } // Optional link for virtual consultation
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
