module.exports = {
  //設定比較是否相等的helper
  eq: function (a, b) {
    if (a === b) {
      return true
    } else {
      return false
    }
  }, //設定加總的helper
  total: function (array) {
    let sum = 0 //sum start at 0 

    array.forEach(function (doc) {
      sum += doc.amount
    }) // doc = Record's data , add up all amounts in this array

    return sum // return total
  }, //設定日期格式helper
  dateFormate: function (date) {
    return date.toJSON().substring(0, 10)
  },
}
