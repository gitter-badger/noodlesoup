Users = Meteor.users

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
  realname: {
    type: String,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  }
})

Users.attachSchema(Noodlesoup.schemas.User)