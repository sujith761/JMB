const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret'
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR
    const options = {
      amount: Math.round(Number(amount) * 100), // to paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    };
    const order = await instance.orders.create(options);

    const payment = await Payment.create({
      user: req.user.id,
      amount: Number(amount),
      currency: 'INR',
      status: 'created',
      razorpayOrderId: order.id
    });

    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: process.env.RAZORPAY_KEY_ID, paymentId: payment._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId, bookingId } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret')
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    const status = generated_signature === razorpay_signature ? 'success' : 'failed';

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status
      },
      { new: true }
    );

    if (bookingId) {
      await Booking.findByIdAndUpdate(bookingId, { payment: payment._id });
    }

    res.json({ status, payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.all = async (req, res) => {
  try {
    const items = await Payment.find().populate('user').populate('booking').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
