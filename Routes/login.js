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
    changePassword,
    checkOtp
} = require('../Controllers/login')
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
router.post('/check-otp', checkOtp)
router.post('/changepassword', changePassword)


module.exports = router

