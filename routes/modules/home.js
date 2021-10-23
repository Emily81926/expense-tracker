const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    .then(records => {
      Category.find()
        .lean()
        .then(categories => {
          records.forEach(record => {
            categories.forEach(category => {
              if (String(record.categoryId) === String(category._id)) {
                record.icon = category.icon
              }
            })
          })
          Record.aggregate([{ $group: { _id: '$category' } }])
            .then(categoryAmount =>
              res.render('index', { records, categories })
            )
        })
    })
})




module.exports = router