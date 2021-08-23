const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('this will be expense tracker!!!')
})

app.listen(port, () => {
  console.log(`This is running on a localhost:${port}`)
})