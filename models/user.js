Users = Meteor.users
Tokens = new Mongo.Collection('tokens')

App.schemas.UserProfile = new SimpleSchema({
  realname: {
    type: String,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  }
})

App.schemas.User = new SimpleSchema({
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
  rank: {
    type: Number
  },
  profile: {
    type: App.schemas.UserProfile,
    optional: true
  }
})

App.schemas.Token = new SimpleSchema({
  token: {
    type: String,
    min: 9,
    max: 10
  }
})

Users.attachSchema(App.schemas.User)
Tokens.attachSchema(App.schemas.Token)