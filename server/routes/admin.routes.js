const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { list } = require('../controllers/booking.controller');
const paymentCtrl = require('../controllers/payment.controller');
const contactCtrl = require('../controllers/contact.controller');

router.get('/bookings', auth('admin'), list);
router.get('/payments', auth('admin'), paymentCtrl.all);
router.get('/messages', auth('admin'), contactCtrl.list);
router.post('/messages/:id/reply', auth('admin'), contactCtrl.reply);

module.exports = router;
