Router.route('/user', function () {
  if (Meteor.userId()) {
    this.render('userEdit')
  } else {
    this.redirect('/')
  }
})

Router.route('/gentoken', function () {
  if (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'admin')) {
    this.render('userTokenGen')
  } else {
    this.redirect('/')
  }
})

Router.route('/a/:user_name/edit', function () {
  if (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'admin')) {
    this.render('userAdmin', {
      data: function () {
        return Users.findOne({username: this.params.user_name})
      }
    })
  } else {
    this.redirect('/')
  }
})