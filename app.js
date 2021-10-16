const express = require('express')
const session = require('express-session')
const app = express()

const exphbs = require('express-handlebars')
const Record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/helpers') }))
app.set('view engine', 'hbs')
app.use(session({
  secret:'ThisIsMySecret',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(PORT, () => {
  console.log(`This is running on http://localhost:${PORT}`)
})