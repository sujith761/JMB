const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

exports.create = async (req, res) => {
  try {
    const { processType, fabricType, costPerMeter, quantityMeters, duration, vehicleNumber, notes, totalAmount } = req.body;
    const booking = await Booking.create({
      user: req.user.id,
      processType,
      fabricType,
      costPerMeter,
      quantityMeters,
      duration,
      vehicleNumber,
      notes,
      totalAmount,
      status: 'pending'
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myBookings = async (req, res) => {
  try {
    const items = await Booking.find({ user: req.user.id }).populate('payment');
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const items = await Booking.find(filter).populate('user').populate('payment').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const b = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    res.json(b);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
