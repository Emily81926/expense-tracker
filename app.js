const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')

mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error',() => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  //等等要用到mongodb去
  const list =[{
    id: 1,
    name: '午餐' ,
    date: '2019 / 04 / 23',
    amount: 60 ,
    category:'餐飲食品',
  },{
    id: 2,
    name: '早餐',
    date: '2018 / 03 / 13',
    amount: 10,
    category: '餐飲食品',
  }]
  res.render('index',{ expense: list })
})

app.listen(port, () => {
  console.log(`This is running on http://localhost:3000`)
})