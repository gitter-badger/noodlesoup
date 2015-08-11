Security.defineMethod('ifIsCurrentUser', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc._id
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
Users.permit(['insert']).ifLoggedIn().apply()
Users.permit(['update', 'remove']).ifIsCurrentUser().ifLoggedIn().apply()
Tokens.permit(['insert']).ifLoggedIn().apply()