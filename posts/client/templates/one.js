Template.postOne.helpers({
  getGravatarUrl: function (username) {
    var user = Users.findOne({username: username})
    console.log(user.emails)
    return Gravatar.imageUrl(user.emails[0].address)
  }
})