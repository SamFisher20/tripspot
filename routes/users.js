const express = require('express')
const passport = require('passport')
const router = express.Router()
const wrapAsync = require('../utility/wrapAsync')
const user = require('../model/user')
const users = require('../controllers/auth')

router.route('/register')
    .get(users.renderRegister)
    .post(wrapAsync(users.register))


router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;