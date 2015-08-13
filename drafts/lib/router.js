function redPR (self) {
  if (!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'pr')) {
    self.redirect('/')
  }
}

Router.route('/write/drafts', function () {
  redPR(this)
  this.render('draftsList')
})

Router.route('/write/drafts/:post_slug', function () {
  redPR(this)
  this.render('draftEdit', {
    data: function () {
      return Posts.findOne({slug: this.params.post_slug})
    }
  })
})