if (Users.find().count() === 0) {
  // if no users exist, create an initial one
  Accounts.createUser({
    username: 'schisma',
    email: 'jona@schisma.co',
    password: 'supersecret',
    profile: {
      realname: 'Jona H.',
      bio: 'A cool man.'
    }
  })
}

Accounts.onCreateUser(function (opts, user) {
  Tokens.remove({})
  return user
})