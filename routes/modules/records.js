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

//搜尋類別
router.get('/filter', (req, res) => {
  
  //從選單取得的category
  const filteredCategory = req.query.category
  //篩選用category
  const category = { category: req.query.category }
  //沒有選或是選擇全部
  if (filteredCategory === '請選擇類別' || filteredCategory === '全部'){
    return Record.find()
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

  return Record.find(category)
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