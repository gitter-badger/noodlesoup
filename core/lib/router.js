Router.configure({
  layoutTemplate: 'layoutMain'
})

Router.route('/', function () {
  this.render('postLatest')
})