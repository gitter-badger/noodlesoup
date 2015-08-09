Template.userEdit.helpers({
  users: function () {
    return Users
  },
  user: function () {
    return Meteor.user()
  }
})