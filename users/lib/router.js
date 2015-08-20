function isAdmin () {
  return _.contains(Users.findOne({_id: Meteor.userId()}).roles, 'admin')
}

function userExists (username) {
  return Users.findOne({username: username})
}

Router.route('/settings/general', function () {
  if (Meteor.userId()) {
    this.render('userEdit')
  } else {
    this.render('404')
  }
})

Router.route('/gentoken', function () {
  if (Meteor.userId() && isAdmin()) {
    this.render('userTokenGen')
  } else {
    this.render('404')
  }
})

Router.route('/a/:user_name/edit', function () {
  if (Meteor.userId() && isAdmin() && userExists(this.params.user_name)) {
    this.render('userAdmin', {
      data: function () {
        return Users.findOne({username: this.params.user_name})
      }
    })
  } else {
    this.render('404')
  }
})