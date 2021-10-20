const express = require('express')
const CATEGORY = require('../../models/category')
const router = express.Router()
const Record = require('../../models/record')
const record = require('../../models/record')

//搜尋類別
router.get('/', (req, res) => {
  const userId = req.user._id
  //從選單取得的category
  const filteredCategory = req.query.category
  //篩選用category
  const category = { category: req.query.category }
  //沒有選或是選擇全部
  if (filteredCategory === '請選擇類別' || filteredCategory === '全部') {
    return Record.find({ userId })
      .lean()
      .then(record => {
        record.forEach(item => {
          //switch 當是怎樣的case 就切換成怎樣的結果
          switch (item.category) {
            case '家居物業':
              item['icon'] = CATEGORY.home
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
        res.render('index', { record, filteredCategory }) //不要忘記加filteredCategory
      })
      .catch(error => console.log(error))
  }

  return Record.find({category})
    .lean()
    .then(record => {
      record.forEach(item => {
        //switch 當是怎樣的case 就切換成怎樣的結果
        switch (item.category) {
          case '家居物業':
            item['icon'] = CATEGORY.home
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
      res.render('index', { record, filteredCategory }) //不要忘記加filteredCategory
    })
    .catch(error => console.log(error))

})


module.exports = router