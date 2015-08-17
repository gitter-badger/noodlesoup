if (process.env.NODE_ENV === 'development' && Posts.find({}).count() === 0) {
  Posts.insert({
    title: 'post 1',
    summary: '1',
    body: '1',
    tag: 'post',
    createdAt: Noodlesoup.methods.getTimestamp(new Date()),
    date: new Date(),
    author: 'schisma',
    slug: 'post-1',
    draft: false
  })
  Posts.insert({
    title: 'post 2',
    summary: '2',
    body: '2',
    tag: 'post',
    createdAt: Noodlesoup.methods.getTimestamp(new Date()),
    date: new Date(),
    author: 'schisma',
    slug: 'post-2',
    draft: false
  })
  Posts.insert({
    title: 'post 3',
    summary: '3',
    body: '3',
    tag: 'post',
    createdAt: Noodlesoup.methods.getTimestamp(new Date()),
    date: new Date(),
    author: 'schisma',
    slug: 'post-3',
    draft: false
  })
  Posts.insert({
    title: 'post 4',
    summary: '4',
    body: '4',
    tag: 'post',
    createdAt: Noodlesoup.methods.getTimestamp(new Date()),
    date: new Date(),
    author: 'schisma',
    slug: 'post-4',
    draft: false
  })
  Posts.insert({
    title: 'post 5',
    summary: '5',
    body: '5',
    tag: 'post',
    createdAt: Noodlesoup.methods.getTimestamp(new Date()),
    date: new Date(),
    author: 'schisma',
    slug: 'post-5',
    draft: false
  })
  Posts.insert({
    title: 'post 6',
    summary: '6',
    body: '6',
    tag: 'post',
    createdAt: Noodlesoup.methods.getTimestamp(new Date()),
    date: new Date(),
    author: 'schisma',
    slug: 'post-6',
    draft: false
  })
  Posts.insert({
    title: 'post 7',
    summary: '7',
    body: '7',
    tag: 'post',
    createdAt: Noodlesoup.methods.getTimestamp(new Date()),
    date: new Date(),
    author: 'schisma',
    slug: 'post-7',
    draft: false
  })
}