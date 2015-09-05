/**
 * Additional methods to be executed synchronously.
 */

App.methods = {
  getTimestamp: function (date) {
    var mmt = moment(date)
    return mmt.format('Do MMM YYYY')
  },
  isRankI: function (id, rank) {
    if (Users.findOne({_id: id}).rank >= rank)
      return true
    return false
  },
  isRankU: function (username, rank) {
    if (Users.findOne({username: username}).rank >= rank)
      return true
    return false
  },
  getRank: function (rankNum) {
    return _.invert(App.ranks)[rankNum]
  }
}