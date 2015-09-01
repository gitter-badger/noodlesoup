Posts = new Mongo.Collection('posts')

App.schemas.Post = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    min: 3
  },
  disclaimer: {
    type: String,
    label: 'An optional disclaimer',
    optional: true
  },
  summary: {
    type: String,
    max: 300,
    label: 'Summarize your article. No markdown.'
  },
  body: {
    type: String,
    optional: true,
    label: 'The text'
  },
  tag: {
    type: String,
    label: 'Select a tag for where to categorize this post',
    allowedValues: App.tags
  },
  createdAt: {
    type: String
  },
  date: {
    type: Date
  },
  authorId: {
    type: String
  },
  slug: {
    type: String
  },
  thumbnail: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  draft: {
    type: Boolean,
    defaultValue: true
  }
})

Posts.attachSchema(App.schemas.Post)
Posts.friendlySlugs('title')