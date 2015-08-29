/**
 * Additional methods to be executed synchronous.
 */

App.methods = {
  getTimestamp: function (date) {
    var mmt = moment(date)
    return mmt.format('Do MMM YYYY')
  }
}