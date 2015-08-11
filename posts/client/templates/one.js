Template.postOne.helpers({
  getGravatarUrl: function (username) {
    var user = Users.findOne({username: username})
    return Gravatar.imageUrl(user.emails[0].address)
  },
  isAuthor: function (author) {
    if (author === Meteor.user().username) {
      return true
    }
    return false
  }
})

Template.postOne.events({
  'click #delete-button': function (event) {
    event.preventDefault()
    Posts.remove({_id: this._id})
    Router.go('/')
  }
})