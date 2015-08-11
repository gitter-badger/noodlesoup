Security.defineMethod('ifIsCurrentUserOrAdmin', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return (userId !== doc._id) || !Roles.userIsInRole(userId, 'admin')
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
Users.permit(['update', 'remove']).ifIsCurrentUserOrAdmin().ifLoggedIn().apply()
Tokens.permit(['insert']).ifLoggedIn().apply()