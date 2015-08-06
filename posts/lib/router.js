// redirect if not logged in
// TODO: for some reason globbing the router like '/write/*' doesn't work? this needs fixing
function red (self) {
  if (!Meteor.user()) {
    self.redirect('/')
  }
}

Router.route('/write/new', function () {
  red(this)
  this.render('postNew')
})
