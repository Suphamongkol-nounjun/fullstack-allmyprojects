const express = require('express')
const {
    testlogin,
    register,
    userscookie,
    userstoken,
    loginsavetoken,
    loginsavecookie,
    loginsession,
    userssession,
    generateOtp,
    sendOtp,
    changePassword
} = require('../Controllers/login')
const { generateOTP } = require('../utils/otp-utils')
const router = express.Router()

router.get('/testlogin', testlogin)
router.post('/register', register)
router.post('/loginsavetoken', loginsavetoken)
router.post('/loginsavecookie', loginsavecookie)
router.post('/loginsession', loginsession)
router.get('/userstoken', userstoken)
router.get('/userscookie', userscookie)
router.get('/userssession', userssession)
router.post('/generate-otp', generateOtp)
router.post('/send-otp', sendOtp)
router.post('/changepassword', changePassword)


module.exports = router

