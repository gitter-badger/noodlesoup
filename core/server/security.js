Security.defineMethod('ifIsCurrentUserOrAdmin', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    if (userId === doc._id) {
      return false
    } else if (Roles.userIsInRole(userId, 'admin')) {
      return false
    } else {
      return true
    }
  }
})

Security.defineMethod('ifIsAdmin', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return !Roles.userIsInRole(userId, 'admin')
  }
})

Security.defineMethod('ifIsCurrentUsersPost', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return Users.findOne({_id: userId}).username !== doc.author
  }
})



Posts.permit(['insert']).ifLoggedIn().apply()
Posts.permit(['update', 'remove']).ifIsCurrentUsersPost().ifLoggedIn().apply()
Users.permit(['insert', 'update', 'remove']).ifIsCurrentUserOrAdmin().ifLoggedIn().apply()
Tokens.permit(['insert']).ifLoggedIn().apply()