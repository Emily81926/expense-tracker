const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')



router.get('/new', (req, res) => {
  return res.render('new')
})

//新增消費紀錄
router.post('/', (req, res) => {
  req.body.userId = req.user._id
  return Category.find()
    .lean()
    .then(categories => {
      categories.forEach(category => {
        //新增record的categoryId要和category資料庫裡的id搭配
        if (category.name === req.body.category) req.body.categoryId = category._id
      })
      Record.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId})
    .lean()
    .then((record) => { res.render('edit', { record }) })
    .catch(error => console.log(error))
})
//修改消費紀錄
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  
  return Category.find()
  .lean()
  .then(categories => {
     categories.forEach(category => {
       //修改record的categoryId要和category資料庫裡的id搭配
       if(category.name === req.body.category) req.body.categoryId = category._id
     })
    Record.findOne({ _id, userId })
      .then(record => {
        //要確認record的物件跟req.body的物件屬性相同，才能夠覆寫資料
       record = Object.assign(record, req.body)
        return record.save()
      })
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
  })
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router