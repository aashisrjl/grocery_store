const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const { addCredit, paidCredit, unpaidCredit, deleteCredit, handleCreditRequest, creditRequest, updateCredit, getAllCredit, getAcceptedCredit, getPendingCredit, getRejectedCredit } = require('../controllers/creditController');
const { errorHandler } = require('../services/catchAsyncError');
const router = express.Router();

router.route("/credit")
.post(isAuthenticated,allowedTo('admin'),
errorHandler(addCredit))
.get(isAuthenticated,allowedTo('admin'),
errorHandler(getAllCredit))

router.route("/credit-req/:productId")
.post(isAuthenticated,creditRequest)

router.route("/credit-handle/:id")
.patch(isAuthenticated,allowedTo('admin'),errorHandler(handleCreditRequest))

router.route("/credit/:id")
.delete(isAuthenticated,allowedTo('admin'),errorHandler(deleteCredit))

router.route("/credit/:id")
.patch(isAuthenticated,allowedTo('admin'),errorHandler(updateCredit))

router.route("/credit-paid")
.get(errorHandler(paidCredit))

router.route("/credit-unpaid")
.get(errorHandler(unpaidCredit))

router.route("/credit-accepted")
.get(errorHandler(getAcceptedCredit))

router.route("/credit-rejected")
.get(errorHandler(getRejectedCredit))

router.route("/credit-pending")
.get(errorHandler(getPendingCredit))

module.exports = router;