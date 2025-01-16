const express = require('express');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const router = express.Router();

router.route("/credit").post(isAuthenticated,addCredit)
router.route("/credit-req/:id").post(isAuthenticated,requestCredit)
router.route("/credit-handle/:id").post(isAuthenticated,allowedTo('admin'),handleRequest)
router.route("/credit/:id").delete(isAuthenticated,allowedTo('admin'),deleteCredit)
router.route("/credit-paid").get(paidCredit)
router.route("/credit-unpaid").get(unpaidCredit)

module.exports = router;