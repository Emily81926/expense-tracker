const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const mongoose = require('mongoose')

//搜尋類別
router.post('/', (req, res) => {
  const userId = req.user._id
  //
  const categoryId = req.body.categoryId ? mongoose.Types.ObjectId(req.body.categoryId) : { $ne: '' }

  return Record.aggregate([
    {
      $project: {
        name: 1, date: 1, amount: 1, category: 1, categoryId: 1, userId: 1,
      }
    }, //找出與categoryId及userId相符合的資料
    { $match: { categoryId, userId } }
  ])
    .then(records => {
      //將catetory找出的資料跟record得出的資料進行配對
      //如果record.categoryId跟category._id相符合，顯示相對應的icon
      Category.find()
        .lean()
        .then(categories => {
          categories.forEach(category => {
            records.filter(record => {
              if (String(record.categoryId) === String(category._id)) {
                record.icon = category.icon
              }
            })
            if (String(categoryId) === String(category._id)) category.selected = true
          })
          //以$category作為分組
          Record.aggregate([
            {
              $project: {
                name: 1, date: 1, amount: 1, category: 1, categoryId: 1, userId: 1,
              }
            },
            { $match: { categoryId, userId } },
            { $group: { _id: '$category' } }
          ])
            .then( res.render('index', { records, categories }))
        })
    })
    .catch(error => console.log(error))
})



module.exports = router