Template.postLatest.helpers({
  posts: function () {
    // TODO: fetch them by actual date
    return Posts.find({}, {limit: 5}).fetch().reverse()
  }
})