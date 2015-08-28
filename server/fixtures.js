if (Users.find().count() === 0) {
  // if no users exist, create an initial one
  var id = Accounts.createUser({
    username: 'schisma',
    email: 'jona@schisma.co',
    password: 'supersecret',
    profile: {
      realname: 'Jona H.',
      bio: 'A cool man.'
    }
  })
  Roles.addUsersToRoles(id, ['admin', 'writer', 'pr'])
}

if (process.env.NODE_ENV === 'development' && Posts.find({}).count() === 0) {
  Posts.insert({
    title: 'post 1',
    summary: '1',
    body: '1',
    tag: 'anime',
    createdAt: App.methods.getTimestamp(new Date()),
    date: new Date(),
    authorId: Users.findOne({username: 'schisma'})._id,
    thumbnail: 'http://placekitten.com/g/500/500',
    slug: 'post-1',
    draft: false
  })
  Posts.insert({
    title: 'post 2',
    summary: '2',
    body: '2',
    tag: 'anime',
    createdAt: App.methods.getTimestamp(new Date()),
    date: new Date(),
    authorId: Users.findOne({username: 'schisma'})._id,
    thumbnail: 'http://placekitten.com/g/500/500',
    slug: 'post-2',
    draft: false
  })
  Posts.insert({
    title: 'post 3',
    summary: '3',
    body: '3',
    tag: 'anime',
    createdAt: App.methods.getTimestamp(new Date()),
    date: new Date(),
    authorId: Users.findOne({username: 'schisma'})._id,
    thumbnail: 'http://placekitten.com/g/500/500',
    slug: 'post-3',
    draft: false
  })
  Posts.insert({
    title: 'post 4',
    summary: '4',
    body: '4',
    tag: 'anime',
    createdAt: App.methods.getTimestamp(new Date()),
    date: new Date(),
    authorId: Users.findOne({username: 'schisma'})._id,
    thumbnail: 'http://placekitten.com/g/500/500',
    slug: 'post-4',
    draft: false
  })
  Posts.insert({
    title: 'post 5',
    summary: '5',
    body: '5',
    tag: 'anime',
    createdAt: App.methods.getTimestamp(new Date()),
    date: new Date(),
    authorId: Users.findOne({username: 'schisma'})._id,
    thumbnail: 'http://placekitten.com/g/500/500',
    slug: 'post-5',
    draft: false
  })
  Posts.insert({
    title: 'post 6',
    summary: '6',
    body: '6',
    tag: 'anime',
    createdAt: App.methods.getTimestamp(new Date()),
    date: new Date(),
    authorId: Users.findOne({username: 'schisma'})._id,
    thumbnail: 'http://placekitten.com/g/500/500',
    slug: 'post-6',
    draft: false
  })
  Posts.insert({
    title: 'post 7',
    summary: '7',
    body: '7',
    
    tag: 'anime',
    createdAt: App.methods.getTimestamp(new Date()),
    date: new Date(),
    authorId: Users.findOne({username: 'schisma'})._id,
    thumbnail: 'http://placekitten.com/g/500/500',
    slug: 'post-7',
    draft: false
  })
}

Accounts.onCreateUser(function (opts, user) {
  Tokens.remove({})
  return user
})