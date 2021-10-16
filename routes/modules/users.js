const express = require('express')
const CATEGORY = require('../../models/category')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

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

router.post('/login', passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/users/login',
}))

router.get('/logout', (req, res) => {
 req.logout()
 res.redirect('/users/login')
})


module.exports = router