const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'Doctor' }).select('-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'Doctor' }).select('-password');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
