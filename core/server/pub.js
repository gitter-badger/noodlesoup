Meteor.publish('posts', function () {
  return Posts.find()
})

Meteor.publish('userData', function () {
  return Users.find({}, {
    fields: {
      emails: 1
    }
  })
})