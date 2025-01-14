const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { errorHandler } = require('../services/catchAsyncError');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();

router.route('/placeOrder').post(isAuthenticated,errorHandler(createOrder))


module.exports = router