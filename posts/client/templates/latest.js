Template.postLatest.helpers({
  posts: function () {
    return Posts.find({}, {limit: 5})
  }
})

Template.postLatestOne.helpers({
  // trim the body size to 200 characters and if it goes over,
  // append a 'read more' link
  trimBody: function (body) {
    return body.slice(0, 20)
  }
})