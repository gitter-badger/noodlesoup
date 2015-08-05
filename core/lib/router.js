Router.configure({
  layoutTemplate: 'layoutMain'
})

Router.route('/', function () {
  this.render('postLatest')
})

Router.route('/logout', function () {
  AccountsTemplates.logout()
})