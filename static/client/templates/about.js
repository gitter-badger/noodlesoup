Template.staticAbout.helpers({
  users: function () {
    return Users.find()
  },
  getGravatarUrl: function (emails) {
    return Gravatar.imageUrl(emails[0].address)
  }
})