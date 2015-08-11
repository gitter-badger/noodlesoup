// redirect if not logged in
// TODO: for some reason globbing the router like '/write/*' doesn't work? this needs fixing
function red (self) {
  if (!Meteor.user()) {
    self.redirect('/')
  }
}

function redWrt (self) {
  if (!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'writer')) {
    self.redirect('/')
  }
}

function redPR (self) {
  if (!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'pr')) {
    self.redirect('/')
  }
}

// POST FRONTEND

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
  this.render('postAuthor', {
    data: {
      author_name: this.params.author_name
    }
  })
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
