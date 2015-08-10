Template.userEdit.helpers({
  getRealname: function () {
    return Users.find({_id: Meteor.userId()}).fetch()[0].profile.realname
  },
  getBio: function () {
    return Users.find({_id: Meteor.userId()}).fetch()[0].profile.bio
  }
})

Template.userEdit.events({
  'submit #updateUserForm': function (event) {
    event.preventDefault()
    // set to the current value
    var realname = event.target.realname.value || Users.find({_id: Meteor.userId()}).fetch()[0].profile.realname
      , bio = event.target.bio.value || Users.find({_id: Meteor.userId()}).fetch()[0].profile.bio
    
    Users.update({_id: Meteor.userId()}, {$set: {profile: {realname: realname, bio: bio}}})
    Router.go('/')
  },
  'submit #updateUserPasswordForm': function (event) {
    event.preventDefault()

    Accounts.changePassword(event.target.oldPassword.value, event.target.newPassword.value)
    Router.go('/')
  }
})