Posts = new Mongo.Collection('posts')

Noodlesoup.schemas.Post = new SimpleSchema({
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
    label: 'The text'
  },
  tag: {
    type: String,
    label: 'Select a tag for where to categorize this post',
    allowedValues: Noodlesoup.tags
  },
  createdAt: {
    type: String
  },
  date: {
    type: Date
  },
  author: {
    type: String
  },
  slug: {
    type: String
  },
  thumbnail: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  draft: {
    type: Boolean,
    defaultValue: true
  }
})

Posts.attachSchema(Noodlesoup.schemas.Post)
Posts.friendlySlugs('title')