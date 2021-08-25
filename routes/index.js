const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const records = require('./modules/records')
router.use('/records', records)

const filter = require('./modules/filter')
router.use('/filter', filter)

module.exports = router