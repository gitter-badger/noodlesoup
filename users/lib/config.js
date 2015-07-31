// AccountsTemplates config

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  displayName: 'username',
  required: true,
  minLength: 3,
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

AccountsTemplates.configureRoute('signIn', {
  path: '/login'
})