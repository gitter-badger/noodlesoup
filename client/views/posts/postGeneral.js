/**
 * General post JS
 * Bigger JS chunks are in their own JS file (like postLatest)
 */


// Variables for pagination
Template.postLatest.limit = 5
Template.postTag.limit = 5
Template.postAuthor.limit = 5
var _latestTrigger = new Deps.Dependency()
  , _tagTrigger = new Deps.Dependency()
  , _authorTrigger = new Deps.Dependency()

/*----------  ONE POST IN LISTING  ----------*/

Template.postListOne.helpers({
  getAuthor: function (id) {
    return Users.findOne({_id: id}).username
  }
})

/*===================================
=            TAG LISTING            =
===================================*/

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

/*======================================
=            AUTHOR LISTING            =
======================================*/

Template.postAuthor.helpers({
  posts: function () {
    _authorTrigger.depend()
    return Posts.find({authorId: Users.findOne({username: this.author_name})._id}, {limit: Template.postAuthor.limit, sort: {date: -1}})
  },
  hasMore: function () {
    _authorTrigger.depend()
    return !(Posts.find({authorId: Users.findOne({username: this.author_name})._id}, {draft: false}).count() <= Template.postAuthor.limit)
  }
})

Template.postAuthor.events({
  'click .ns.loadmore': function (event, template) {
    Template.postAuthor.limit += 5
    _authorTrigger.changed()
  }
})

/*================================
=            NEW POST            =
================================*/

Template.postNew.helpers({
  tags: function () {
    var r = []
    App.tags.forEach(function (e) {
      r.push({value: e, label: e})
    })
    return r
  }
})

/*=================================
=            POST EDIT            =
=================================*/

Template.postEdit.helpers({
  getDoc: function () {
    return this
  }
})