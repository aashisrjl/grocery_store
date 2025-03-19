const express = require('express')
const { getLoginUser, getAlluser, getRecentUser } = require('../controllers/userController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { errorHandler } = require('../services/catchAsyncError')
const { allowedTo } = require('../middleware/allowedTo')
const router = express.Router()

router.route("/user").get(isAuthenticated,errorHandler(getLoginUser))
router.route("/users").get(isAuthenticated,allowedTo('admin'),errorHandler(getAlluser))
router.route("/users/recent").get(isAuthenticated,allowedTo('admin'),errorHandler(getRecentUser))

module.exports= router