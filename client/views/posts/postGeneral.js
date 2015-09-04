/**
 * General post JS
 * Bigger JS chunks are in their own JS file (like postLatest)
 */

// Limits for pagination
Template.postLatest.limit = 5
Template.postTag.limit = 5
Template.postAuthor.limit = 5


var _tagTrigger = new Tracker.Dependency()
  , _authorTrigger = new Tracker.Dependency()

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
  thereArePosts: function () {
    return Posts.find({tag: this.tag_name, draft: false}, {limit: 1}).count() > 0
  },
  posts: function () {
  	document.title = this.tag_name //- Setting document title for tags
    _tagTrigger.depend()
    return Posts.find({tag: this.tag_name, draft: false}, {limit: Template.postTag.limit, sort: {date: -1}})
  },
  hasMore: function () {
    _tagTrigger.depend()
    return !(Posts.find({tag: this.tag_name, draft: false}, {draft: false}).count() <= Template.postTag.limit)
  },
  isEpisodeReview: function () {
    return this.tag_name === 'episode review'
  },
  isSpotlight: function () {
    return this.tag_name === 'spotlight'
  },
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
  document.title = "Noodlesoup | " + this.author_name //- Setting author name in the title
    _authorTrigger.depend()
    return Posts.find({authorId: Users.findOne({username: this.author_name})._id, draft: false}, {limit: Template.postAuthor.limit, sort: {date: -1}})
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
  },
  tags: function () {
    var r = []
    App.tags.forEach(function (e) {
      r.push({value: e, label: e})
    })
    return r
  }
})