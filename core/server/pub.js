Meteor.publish('posts', function () {
  return Posts.find()
})

Meteor.publish('userData', function () {
  return Users.find({}, {
    fields: {
      username: 1,
      emails: 1
    }
  })
})