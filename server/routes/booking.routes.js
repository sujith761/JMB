const router = require('express').Router();
const ctrl = require('../controllers/booking.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth(), ctrl.create);
router.get('/my', auth(), ctrl.myBookings);
router.put('/:id/status', auth('admin'), ctrl.updateStatus);

module.exports = router;
