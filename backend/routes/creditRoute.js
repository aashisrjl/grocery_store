const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const { addCredit, paidCredit, unpaidCredit, deleteCredit, handleCreditRequest, creditRequest } = require('../controllers/creditController');
const { errorHandler } = require('../services/catchAsyncError');
const router = express.Router();

router.route("/credit")
.post(isAuthenticated,allowedTo('admin'),
errorHandler(addCredit))

router.route("/credit-req/:productId")
.post(isAuthenticated,creditRequest)

router.route("/credit-handle/:id")
.post(isAuthenticated,allowedTo('admin'),errorHandler(handleCreditRequest))

router.route("/credit/:id")
.delete(isAuthenticated,allowedTo('admin'),errorHandler(deleteCredit))

router.route("/credit-paid")
.get(errorHandler(paidCredit))

router.route("/credit-unpaid")
.get(errorHandler(unpaidCredit))

module.exports = router;