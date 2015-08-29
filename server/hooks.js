/**
 * Serverside hooks.
 */


Accounts.onCreateUser(function (opts, user) {
  Tokens.remove({})
  return user
})