const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const moment = require('moment')
const record = require('../../models/record')


router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(record => res.render('index', { record }))
    .catch(error => console.log(error))

})

module.exports = router