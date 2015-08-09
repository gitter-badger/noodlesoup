if (Users.find().count() === 0) {
  // if no users exist, create an initial one
  Accounts.createUser({
    username: 'admin',
    email: 'jona@schisma.co',
    password: 'supersecret',
    profile: {
      realname: 'Ad Min',
      bio: 'A cool man.'
    }
  })
}