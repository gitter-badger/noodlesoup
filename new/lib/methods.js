Noodlesoup.methods = {
  getTimestamp: function (date) {
    var mmt = moment(date)
    return mmt.format('Do MMM YYYY')
  }
}