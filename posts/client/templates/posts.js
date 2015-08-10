Template.postLatest.helpers({
  posts: function () {
    // TODO: fetch them by actual date
    return Posts.find({}, {limit: 5}).fetch().reverse()
  }
})

Template.postTag.helpers({
  posts: function () {
    return Posts.find({tag: this.tag_name}, {limit: 5}).fetch().reverse()
  }
})

Template.postAuthor.helpers({
  posts: function () {
    return Posts.find({author: this.author_name}, {limit: 5}).fetch().reverse()
  }
})