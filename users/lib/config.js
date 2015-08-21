// AccountsTemplates config

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  displayName: 'username',
  required: true,
  minLength: 3,
  lowercase: true,
  errStr: 'Invalid username!'
})

AccountsTemplates.removeField('email')
AccountsTemplates.addField({
  _id: 'email',
  type: 'email',
  required: true,
  re: /.+@(.+){2,}\.(.+){2,}/,
  errStr: 'Invalid email address.'
})

AccountsTemplates.removeField('password')
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  required: true,
  minLength: 3,
  errStr: 'Invalid password.'
})

AccountsTemplates.addField({
  _id: 'token',
  type: 'text',
  displayName: "Invite token",
  required: true,
  minLength: 9,
  maxLength: 10,
  errStr: 'Invalid invite token.',
  func: function (token) {
    var otherToken = Tokens.findOne({token: token})
    if (otherToken) {
      return false
    } else {
      return true
    }
  }
})

AccountsTemplates.configure({
  defaultLayout: 'layoutAccounts',
  forbidClientAccountCreation: false,
  overrideLoginErrors: false
})

AccountsTemplates.configureRoute('signIn', {
  path: '/login'
})

AccountsTemplates.configureRoute('signUp', {
  path: '/register'
})