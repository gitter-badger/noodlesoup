Router.route('/user', function () {
  if (Meteor.user()) {
    this.render('userEdit')
  } else {
    this.redirect('/')
  }
})