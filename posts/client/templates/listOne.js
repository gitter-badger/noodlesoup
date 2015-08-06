Template.postListOne.helpers({
  // trim the body size to 200 characters and if it goes over,
  // append a 'read more' link
  trimBody: function (body) {
    var newBody = body.slice(0, 100)
    if (body.length > 100) {
      newBody.concat('...')
    }
    return newBody
  },
  getTimestamp: function (date) {
    var mmt = moment(date)
    return mmt.format('Do MMM YYYY')
  }
})