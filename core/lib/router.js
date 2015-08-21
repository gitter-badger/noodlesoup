Router.configure({
  layoutTemplate: 'layoutMain',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
})

Router.route('/', function () {
  this.render('postLatest')
})

Router.route('/logout', function () {
  AccountsTemplates.logout()
})