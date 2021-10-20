const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')



router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({ userId })
    .lean()
    //設定index.hbs的category selector
    .then(records =>{
      Category.find()
      .lean()
      .then(categories => {
        records.forEach(record => {
          categories.forEach(category => {
            if(String(record.categoryId) === String(category._id)){
              record.icon = category.icon
            }
          })
        })
        res.render('index', { records, categories })
      })
       
    })
    .catch(error => console.log(error))
})

module.exports = router