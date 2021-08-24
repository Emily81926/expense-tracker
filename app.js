const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')
const Record = require('./models/record')

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
  Record.find()
      .lean()
      .then(records => res.render('index', { records }))
      .catch(error => console.log(error))
  
  
})

app.listen(port, () => {
  console.log(`This is running on http://localhost:3000`)
})