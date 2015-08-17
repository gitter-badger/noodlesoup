Router.configure({
  layoutTemplate: 'layoutMain',
  loadingTemplate: 'loading'
})

Router.route('/', function () {
  this.render('postLatest')
})

Router.route('/logout', function () {
  AccountsTemplates.logout()
})