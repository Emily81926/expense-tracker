const express = require('express')
const CATEGORY = require('../../models/category')
const router = express.Router()
const User = require('../../models/user')

router.get('/register', (req, res) =>{
 res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({email})
  .then(user => {
    if(user){
       console.log('User is already exist!')
       res.render('register',{
         name,
         email,
         password,
         confirmPassword
       })
    } else{
      return User.create({
        name,
        email,
        password,
        confirmPassword
      })
        .then(res.redirect('/'))
        .catch(err => console.log(err))
    }
  }) 
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})


module.exports = router