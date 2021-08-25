const express = require('express')
const CATEGORY = require('../../models/category')
const router = express.Router()
const Record = require('../../models/record')
const record = require('../../models/record')


router.get('/', (req, res) => {
  Record.find()
    .lean()
    //設定index.hbs的category selector
    .then(record =>{
      record.forEach(item => {
        //switch 當是怎樣的case 就切換成怎樣的結果
        switch (item.category){
          case '家居業務':
            item['icon'] = CATEGORY.house
            break
          case '交通出行':
            item['icon'] = CATEGORY.transportation
            break
          case '休閒娛樂':
            item['icon'] = CATEGORY.entertainment
            break
          case '餐飲食品':
            item['icon'] = CATEGORY.food
            break
          default:
            item['icon'] = CATEGORY.other
        }
      })
       res.render('index', { record })
    })
    .catch(error => console.log(error))

})

module.exports = router