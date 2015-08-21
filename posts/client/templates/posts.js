Template.postLatest.limit = 5
Template.postTag.limit = 5
Template.postAuthor.limit = 5
var _latestTrigger = new Deps.Dependency()
  , _tagTrigger = new Deps.Dependency()
  , _authorTrigger = new Deps.Dependency()

Template.postLatest.helpers({
  posts: function () {
    _latestTrigger.depend()
    return Posts.find({draft: false}, {limit: 6 + Template.postLatest.limit, sort: {date: -1}}).fetch().slice(5)
  },
  hasMore: function () {
    _latestTrigger.depend()
    return !(Posts.find({draft: false}).count() <= 6 + Template.postLatest.limit)
  },
  firstThree: function () {
    return Posts.find({draft: false}, {limit: 3, sort: {date: -1}})
  },
  lastThree: function () {
    return Posts.find({draft: false}, {limit: 6, sort: {date: -1}}).fetch().slice(2, 5)
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
    return !(Posts.find({tag: this.tag_name}, {draft: false}).count() <= Template.postTag.limit)
  },
  isEpisodeReview: function () {
    if (this.tag_name === 'episode review')
      return true
    return false
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
    return !(Posts.find({author: this.author_name}, {draft: false}).count() <= Template.postAuthor.limit)
  }
})

Template.postAuthor.events({
  'click .ns.loadmore': function (event, template) {
    Template.postAuthor.limit += 5
    _authorTrigger.changed()
  }
})

Template.postNew.helpers({
  tags: function () {
    var r = []
    Noodlesoup.tags.forEach(function (e) {
      r.push({value: e, label: e})
    })
    return r
  }
})