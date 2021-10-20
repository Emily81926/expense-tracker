if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const { recordSeed } = require('./recordSeed.json')
const { userSeed } = require('./userSeed.json')

db.once('open', () => {
  console.log('mongodb connected!')
  const { name, email, password } = userSeed
  //註冊userSeed帳號
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
      name,
      email,
      password: hash
    }))
    .then(user => {
      //在Category資料庫找出資料，將record跟category進行配對
      //再來把rocord跟剛建好的user帳號進行配對
      Category.find()
      .lean()
      .then(categories => {
        return Promise.all(Array.from(recordSeed, (record, i) => {
          const category = categories.find(category => category.name === record.category)
          record.categoryId = category._id
          record.userId = user._id
        }))
      })
      //在record資料庫加入recordSeed資料
        .then(() => Record.create(recordSeed))
        .then(() => {
          console.log('categorySeed create done')
          return db.close()
        })
    })
    .catch(err => console.log(err))

})