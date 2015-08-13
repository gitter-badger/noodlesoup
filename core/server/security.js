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

Security.defineMethod('ifIsRole', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return !Roles.userIsInRole(userId, arg)
  }
})

Security.defineMethod('ifIsCurrentUsersPost', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return Users.findOne({_id: userId}).username !== doc.author
  }
})

Security.defineMethod('ifIsDraft', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return doc.draft !== true
  }
})


Posts.permit(['insert']).ifLoggedIn().ifIsRole('writer').apply()
Posts.permit(['update']).ifLoggedIn().ifIsRole('pr').ifIsDraft().apply()
Posts.permit(['update', 'remove']).ifIsCurrentUsersPost().ifIsRole('writer').ifLoggedIn().apply()
Users.permit(['insert', 'update', 'remove']).ifIsCurrentUserOrAdmin().ifLoggedIn().apply()
Tokens.permit(['insert']).ifLoggedIn().apply()