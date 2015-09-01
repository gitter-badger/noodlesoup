var _latestTrigger = new Tracker.Dependency()

Template.postLatest.helpers({
  posts: function () {
    _latestTrigger.depend()
    return Posts.find({draft: false}, {limit: 6 + Template.postLatest.limit, sort: {date: -1}}).fetch().slice(6)
  },
  hasMore: function () {
    _latestTrigger.depend()
    return !(Posts.find({draft: false}).count() <= 6 + Template.postLatest.limit)
  },
  firstThree: function () {
    return Posts.find({draft: false}, {limit: 3, sort: {date: -1}})
  },
  lastThree: function () {
    return Posts.find({draft: false}, {limit: 6, sort: {date: -1}}).fetch().slice(3, 6)
  },
  getAuthor: function (id) {
    return Users.findOne({_id: id}).username
  }
})

Template.postLatest.events({
  'click .ns.loadmore': function (event, template) {
    Template.postLatest.limit += 5
    _latestTrigger.changed()
  }
})