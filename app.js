const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Record.find()
      .lean()
      .then(record => res.render('index', { record }))
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

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
   .lean()
   .then((record)=> { res.render('edit', { record })})
   .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findById(id)
        .then(record => {
          record.name = name,
          record.date = date,
          record.category = category,
          record.amount = amount
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`This is running on http://localhost:3000`)
})