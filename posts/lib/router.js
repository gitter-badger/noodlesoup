// redirect if not logged in
// TODO: for some reason globbing the router like '/write/*' doesn't work? this needs fixing
function red (self) {
  if (!Meteor.user()) {
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

// WRITER BACKEND

Router.route('/write/new', function () {
  red(this)
  this.render('postNew')
})
