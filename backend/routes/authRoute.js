const express = require('express')
const passport = require('passport')
const { handleLogin, handleRegister, handleLogout, googleCallback, facebookCallback } = require('../controllers/authController')
const { errorHandler } = require('../services/catchAsyncError')
const router = express.Router()

router.route("/login").post(errorHandler(handleLogin))
router.route("/register").post(errorHandler(handleRegister))
router.route("/logout").get(errorHandler(handleLogout))

// Google authentication routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    errorHandler(googleCallback)
);

// Facebook authentication routes
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'], session: false })
);

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    errorHandler(facebookCallback)
);

module.exports = router