const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error',() => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  Record.find()
      .lean()
      .then(records => res.render('index', { records }))
      .catch(error => console.log(error))
  
  
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records',(req, res) => {
    console.log(req.body)
    const { name, date , category, amount } =  req.body 
  return Record.create({ name, date, category, amount })
     .then(() => res.redirect('/'))
     .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`This is running on http://localhost:3000`)
})