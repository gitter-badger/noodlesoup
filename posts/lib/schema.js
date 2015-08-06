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
  body: {
    type: String,
    label: 'The text'
  },
  tag: {
    type: String,
    label: 'Select a tag for where to categorize this post'
  },
  createdAt: {
    type: String
  },
  author: {
    type: String
  },
  slug: {
    type: String
  }
})

Posts.attachSchema(Noodlesoup.schemas.Post)
Posts.friendlySlugs('title')