Router.route('/user', function () {
  if (Meteor.userId()) {
    this.render('userEdit')
  } else {
    this.redirect('/')
  }
})

Router.route('/gentoken', function () {
  if (Meteor.userId()) {
    this.render('userTokenGen')
  } else {
    this.redirect('/')
  }
})