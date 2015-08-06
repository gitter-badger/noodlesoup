Template.postLatest.helpers({
  posts: function () {
    // TODO: fetch them by actual date
    return Posts.find({}, {limit: 5}).fetch().reverse()
  }
})

Template.postLatestOne.helpers({
  // trim the body size to 200 characters and if it goes over,
  // append a 'read more' link
  trimBody: function (body) {
    var newBody = body.slice(0, 100)
    if (body.length > 100) {
      newBody.concat('...')
    }
    return newBody
  }
})