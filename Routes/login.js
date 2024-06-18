const express = require('express')
const {
    testlogin,
    register,
    userscookie,
    userstoken,
    loginsavetoken,
    loginsavecookie,
    loginsession,
    userssession
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


module.exports = router

