Router.route('/user', function () {
  if (Meteor.userId()) {
    this.render('userEdit')
  } else {
    this.redirect('/')
  }
})