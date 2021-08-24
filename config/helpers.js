const exphbs = require('express-handlebars')

const helpers = exphbs.create({
  eq: function (a, b) {
    if (a === b) {
      return true
    } else {
      return false
    }
  }, 
  total: function (array) {
    let sum = 0

    array.forEach(function (doc) {
      sum += doc.amount
    })

    return sum // return total
  }
})

module.exports = helpers