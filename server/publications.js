/**
 * Collection & data publications.
 * Subscriptions are in client/main.js.
 */


Meteor.publish('posts', function () {
  return Posts.find()
})

Meteor.publish('userData', function () {
  return Users.find({}, {
    fields: {
      _id: 1,
      username: 1,
      emails: 1,
      'profile.realname': 1,
      'profile.bio': 1,
      roles: 1
    }
  })
})

Meteor.publish('tokens', function () {
  return Tokens.find({})
})