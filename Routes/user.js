const express = require('express')
const {
    testuser,
    uploadAvatar
} = require('../Controllers/user')
const router = express.Router()

router.get('/testuser', testuser)
router.post('/profile/upload-avatar/:id', uploadAvatar)


module.exports = router

