const express = require('express')
const { handleLogin, handleRegister, handleLogout } = require('../controllers/authController')
const { errorHandler } = require('../services/catchAsyncError')
const router = express.Router()

router.route("/login").post(errorHandler(handleLogin))
router.route("/register").post(errorHandler(handleRegister))
router.route("/logout").get(errorHandler(handleLogout))

module.exports = router