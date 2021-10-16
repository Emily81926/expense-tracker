const express = require('express')
const CATEGORY = require('../../models/category')
const router = express.Router()
const Record = require('../../models/record')
const record = require('../../models/record')

router.get('/register', (req, res) =>{
 res.render('register')
})

router.post('/register', (req, res) => {

})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})


module.exports = router