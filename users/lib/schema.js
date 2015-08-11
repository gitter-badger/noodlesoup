Users = Meteor.users
Tokens = new Mongo.Collection('tokens')

Noodlesoup.schemas.UserProfile = new SimpleSchema({
  realname: {
    type: String,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  }
})

Noodlesoup.schemas.User = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id 
  },
  username: {
    type: String
  },
  emails: {
    type: [Object]
  },
  "emails.$.address": {
    type: String
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  token: {
    type: String,
    optional: true
  },
  profile: {
    type: Noodlesoup.schemas.UserProfile,
    optional: true
  }
})

Noodlesoup.schemas.Token = new SimpleSchema({
  token: {
    type: String,
    min: 9,
    max: 10
  }
})

Users.attachSchema(Noodlesoup.schemas.User)
Tokens.attachSchema(Noodlesoup.schemas.Token)