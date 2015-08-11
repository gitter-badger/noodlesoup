Security.defineMethod('ifIsCurrentUser', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc._id
  }
})


Posts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()
Users.permit(['insert']).ifLoggedIn().apply()
Users.permit(['update', 'remove']).ifIsCurrentUser().ifLoggedIn().apply()
Tokens.permit(['remove']).apply()
Tokens.permit(['insert']).ifLoggedIn().apply()