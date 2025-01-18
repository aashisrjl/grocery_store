const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const { addCredit, paidCredit, unpaidCredit, deleteCredit, handleCreditRequest } = require('../controllers/creditController');
const { errorHandler } = require('../services/catchAsyncError');
const router = express.Router();

router.route("/credit").post(isAuthenticated,errorHandler(addCredit))
// router.route("/credit-req/:id").post(isAuthenticated,requestCredit)
router.route("/credit-handle/:id")
.post(isAuthenticated,allowedTo('admin'),errorHandler(handleCreditRequest))

router.route("/credit/:id")
.delete(isAuthenticated,allowedTo('admin'),errorHandler(deleteCredit))

router.route("/credit-paid")
.get(errorHandler(paidCredit))

router.route("/credit-unpaid")
.get(errorHandler(unpaidCredit))

module.exports = router;