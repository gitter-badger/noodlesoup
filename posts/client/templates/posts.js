Template.postLatest.limit = 5
Template.postTag.limit = 5
Template.postAuthor.limit = 5
var _latestTrigger = new Deps.Dependency()
  , _tagTrigger = new Deps.Dependency()
  , _authorTrigger = new Deps.Dependency()

Template.postLatest.helpers({
  posts: function () {
    _latestTrigger.depend()
    return Posts.find({draft: false}, {limit: Template.postLatest.limit, sort: {date: -1}})
  },
  hasMore: function () {
    _latestTrigger.depend()
    return !(Posts.find({draft: false}, {limit: Template.postLatest.limit}).count() <= Template.postLatest.limit)
  }
})

Template.postLatest.events({
  'click .ns.loadmore': function (event, template) {
    Template.postLatest.limit += 5
    _latestTrigger.changed()
  }
})

Template.postTag.helpers({
  posts: function () {
    _tagTrigger.depend()
    return Posts.find({tag: this.tag_name}, {limit: Template.postTag.limit, sort: {date: -1}})
  },
  hasMore: function () {
    _tagTrigger.depend()
    return !(Posts.find({draft: false}, {limit: Template.postTag.limit}).count() <= Template.postTag.limit)
  }
})

Template.postTag.events({
  'click .ns.loadmore': function (event, template) {
    Template.postTag.limit += 5
    _tagTrigger.changed()
  }
})

Template.postAuthor.helpers({
  posts: function () {
    _authorTrigger.depend()
    return Posts.find({author: this.author_name}, {limit: Template.postAuthor.limit, sort: {date: -1}})
  },
  hasMore: function () {
    _authorTrigger.depend()
    return !(Posts.find({draft: false}, {limit: Template.postAuthor.limit}).count() <= Template.postAuthor.limit)
  }
})

Template.postAuthor.events({
  'click .ns.loadmore': function (event, template) {
    Template.postAuthor.limit += 5
    _authorTrigger.changed()
  }
})