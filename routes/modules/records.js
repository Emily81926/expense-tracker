const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const CATEGORY = require('../../models/category')


router.get('/new', (req, res) => {
  return res.render('new')
})


router.post('/', (req, res) => {
  // console.log(req.body) //檢查是否有取得req.body
  const { name, date, category, amount } = req.body

  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => { res.render('edit', { record }) })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router