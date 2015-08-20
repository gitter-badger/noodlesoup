function redWrt (self) {
  if (!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'writer')) {
    self.render('404')
  }
}

// POST FRONTEND

Router.route('/reviews', function () {
  this.render('postTag', {
    data: {
      tag_name: 'episode review'
    }
  })
})

Router.route('/p/:post_slug', function () {
  this.render('postOne', {
    data: function () {
      return Posts.findOne({slug: this.params.post_slug})
    }
  })
})

Router.route('/t/:tag_name', function () {
  this.render('postTag', {
    data: {
      tag_name: this.params.tag_name
    }
  })
})

Router.route('/a/:author_name', function () {
  if (Users.findOne({username: this.params.author_name})) {
    this.render('postAuthor', {
      data: {
        author_name: this.params.author_name
      }
    })
  } else {
    this.render('404')
  }
})

// WRITER BACKEND

Router.route('/write/new', function () {
  redWrt(this)
  this.render('postNew')
})

Router.route('/p/:post_slug/edit', function () {
  redWrt(this)
  var post = Posts.findOne({slug: this.params.post_slug})
  // make sure only the creator can edit
  if (post.author !== Meteor.user().username) {
    this.redirect('/p/' + this.params.post_slug)
  }
  this.render('postEdit', {
    data: function () {
      return post
    }
  })
})