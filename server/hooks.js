/**
 * Serverside hooks.
 */

Accounts.onCreateUser(function (opts, user) {
  // hooray for mongodb stability!
  if (!user.profile) {
    user.profile = {}
    user.profile.realname = ""
    user.profile.bio = ""
  }
  Tokens.remove({})
  return user
})