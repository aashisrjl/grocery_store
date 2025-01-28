const express = require('express')
const { getLoginUser } = require('../controllers/userController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { errorHandler } = require('../services/catchAsyncError')
const router = express.Router()

router.route("/user").get(isAuthenticated,errorHandler(getLoginUser))

module.exports= router