const express = require('express')
const { addToCart, getCartItem, deleteCart, updateCart } = require('../controllers/cartController')
const { errorHandler } = require('../services/catchAsyncError')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const router = express.Router()

router.route("/cart")
.post(isAuthenticated, errorHandler(addToCart))
.get(isAuthenticated, errorHandler(getCartItem))
router.route("/cart/:id")
.delete(isAuthenticated, errorHandler(deleteCart))
.patch(isAuthenticated, errorHandler(updateCart))

module.exports = router