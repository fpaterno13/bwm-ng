const express = require('express');
const router = express.Router();
const UserCrtl = require('../controllers/user');
const BookingCtrl = require('../controllers/booking');

router.post('', UserCrtl.authMiddleware, BookingCtrl.createBooking);

module.exports = router;
