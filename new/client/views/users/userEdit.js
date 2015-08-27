Template.userEdit.helpers({
  getRealname: function () {
    return Users.findOne({_id: Meteor.userId()}).profile.realname
  },
  getBio: function () {
    return Users.findOne({_id: Meteor.userId()}).profile.bio
  },
  getEmail: function () {
    return Users.findOne({_id: Meteor.userId()}).emails[0].address
  },
  getUsername: function () {
    return Users.findOne({_id: Meteor.userId()}).username
  }
})

Template.userEdit.events({
  'submit #updateUserForm': function (event) {
    event.preventDefault()
    // set to the current value
    var realname = event.target.realname.value || Users.findOne({_id: Meteor.userId()}).profile.realname
      , bio = event.target.bio.value || Users.findOne({_id: Meteor.userId()}).profile.bio
      , username = event.target.username.value || Users.findOne({_id: Meteor.userId()}).username
      , email = event.target.email.value || Users.findOne({_id: Meteor.userId()}).emails[0].address
    
    Users.update({_id: Meteor.userId()}, {$set: {username: username, 'emails.0.address': email, profile: {realname: realname, bio: bio}}})
    Router.go('/')
  },
  'submit #updateUserPasswordForm': function (event) {
    event.preventDefault()

    Accounts.changePassword(event.target.oldPassword.value, event.target.newPassword.value)
    Router.go('/')
  }
})