/**
 * Security methods (we don't want everything to pass)
 */


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

Security.defineMethod('ifIsCurrentUsersPostOrAdmin', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    if (Users.findOne({_id: userId}).username === Users.findOne({_id: doc.authorId}).username) {
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

Security.defineMethod('ifIsCapable', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    if (Roles.userIsInRole(userId, 'writer') && Users.findOne({_id: userId}).username === Users.findOne({_id: doc.authorId}).username) {
      return false
    } else if (Roles.userIsInRole(userId, 'pr')) {
      return false
    } else {
      return true
    }
  }
})

/*Security.defineMethod('ifIsCurrentUsersPost', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return Users.findOne({_id: userId}).username !== doc.author
  }
})*/

Security.defineMethod('ifIsDraft', {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return doc.draft !== true
  }
})


Posts.permit(['insert']).ifLoggedIn().ifIsRole('writer').apply()
Posts.permit(['update']).ifLoggedIn().ifIsCapable().ifIsDraft().apply()
Posts.permit(['update']).ifIsCurrentUsersPostOrAdmin().ifIsRole('writer').ifLoggedIn().apply()
Posts.permit(['remove']).ifIsCurrentUsersPostOrAdmin().ifIsRole('writer').ifLoggedIn().apply()
Users.permit(['insert', 'update', 'remove']).ifIsCurrentUserOrAdmin().ifLoggedIn().apply()
Tokens.permit(['insert']).ifLoggedIn().apply()