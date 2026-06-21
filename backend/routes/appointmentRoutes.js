const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Book an appointment (Patient)
router.post('/', protect, authorize('Patient'), async (req, res) => {
  try {
    const { doctor, date, timeSlot, notes } = req.body;
    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      date,
      timeSlot,
      notes
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user appointments (Patient or Doctor)
router.get('/', protect, async (req, res) => {
  try {
    let appointments;
    if (req.user.role === 'Patient') {
      appointments = await Appointment.find({ patient: req.user.id }).populate('doctor', 'name specialization');
    } else if (req.user.role === 'Doctor') {
      appointments = await Appointment.find({ doctor: req.user.id }).populate('patient', 'name');
    } else {
      appointments = await Appointment.find({}).populate('patient', 'name').populate('doctor', 'name');
    }
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
