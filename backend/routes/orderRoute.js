const express = require('express');
const { createOrder, verifyEsewaPayment, verifyKhaltiPayment, getOrder, cancelOrder, changeOrderStatus, changePaymentStatus, deleteOrder, getOrderDetailById, countOrder, countPayment, getPaginationOrder, getAllOrders } = require('../controllers/orderController');
const { errorHandler } = require('../services/catchAsyncError');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { allowedTo } = require('../middleware/allowedTo');
const router = express.Router();

//customer
router.route('/order')
.post(isAuthenticated,errorHandler(createOrder))
.get(isAuthenticated,errorHandler(getOrder))

router.route("/order/paging").get(isAuthenticated,allowedTo('admin'),errorHandler(getPaginationOrder))

router.route("/success-esewa")
.get(isAuthenticated,errorHandler(verifyEsewaPayment))

router.route("/success-khalti")
.get(errorHandler(verifyKhaltiPayment))

router.route("/order-cancel/:id")
.patch(isAuthenticated,errorHandler(cancelOrder))


//admin-side
router.route("/order-status/:id")
.patch(isAuthenticated,allowedTo('admin'),errorHandler(changeOrderStatus))

router.route("/order-payment/:id")
.patch(isAuthenticated,allowedTo('admin'),errorHandler(changePaymentStatus))

router.route("/getAllOrder")
.get(isAuthenticated,allowedTo('admin'),errorHandler(getAllOrders))

router.route("/order/:id")
.delete(isAuthenticated,allowedTo('admin'),errorHandler(deleteOrder))
.get(isAuthenticated,getOrderDetailById)

router.route("/orderCount").get(isAuthenticated,allowedTo('admin'),errorHandler(countOrder))

router.route("/paymentCount").get(isAuthenticated,allowedTo('admin'),errorHandler(countPayment))

module.exports = router