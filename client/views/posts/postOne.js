Template.postOne.helpers({
  setTitle: function (title) {
  	document.title = title //- Set title from tpl data
  },
  getGravatarUrl: function (id) {
    var user = Users.findOne({_id: id})
    return Gravatar.imageUrl(user.emails[0].address)
  },
  isAuthor: function (id) {
    if (Users.findOne({_id: id}).username === Meteor.user().username) {
      return true
    } else {
      return false
    }
  },
  isAdminButNotAuthor: function (id) {
    return Roles.userIsInRole(Meteor.userId(), 'admin') && Meteor.user().username !== Users.findOne({_id: id}).username
  },
  getAuthor: function (id) {
    return Users.findOne({_id: id}).username
  }
})

Template.postOne.events({
  'click #delete-button': function (event) {
    event.preventDefault()
    Posts.remove({_id: this._id})
    Router.go('/')
  }
})