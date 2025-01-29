const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const { addCredit, paidCredit, unpaidCredit, deleteCredit, handleCreditRequest, creditRequest, updateCredit, getAllCredit, getAcceptedCredit, getPendingCredit, getRejectedCredit, getLoginUserCredit, getNotLoginUserCredit } = require('../controllers/creditController');
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
.delete(isAuthenticated,errorHandler(deleteCredit))
.patch(isAuthenticated,allowedTo('admin'),errorHandler(updateCredit))


router.route("/credit-paid")
.get(isAuthenticated,errorHandler(paidCredit))

router.route("/credit-unpaid")
.get(isAuthenticated,errorHandler(unpaidCredit))

router.route("/credit-accepted")
.get(isAuthenticated,errorHandler(getAcceptedCredit))

router.route("/credit-rejected")
.get(isAuthenticated,errorHandler(getRejectedCredit))

router.route("/credit-pending")
.get(isAuthenticated,errorHandler(getPendingCredit))

router.route("/credit-loginuser")
.get(isAuthenticated,errorHandler(getLoginUserCredit))

router.route("/credit-notloginuser")
.get(isAuthenticated,errorHandler(getNotLoginUserCredit))
module.exports = router;