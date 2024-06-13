const express = require('express')
const {
    list,
    test,
    read,
    create,
    update,
    deleteAttraction
} = require('../Controllers/attractions')
const router = express.Router()

router.get('/attraction', list)
router.get('/helloworld', test)
router.get('/attraction/:id', read)
router.post('/attraction', create)
router.put('/attraction/:id', update)
router.delete('/attraction/:id', deleteAttraction)

module.exports = router