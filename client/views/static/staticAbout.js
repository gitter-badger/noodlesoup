// Lightweight version of the Fisher-Yates shuffle
function fyShuffle (array) {  
  var currentIndex = array.length, temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
} 

Template.staticAbout.helpers({
  users: function () {
    var users = Users.find().fetch()
    return fyShuffle(users)
  },
  getGravatarUrl: function (emails) {
    return Gravatar.imageUrl(emails[0].address, {
      size: 300
    })
  },
  getRole: function () {
    var user = Users.findOne({username: this.username})
      , role
    role = user.roles[0] === 'pr' ? 'proofreader' : user.roles[0]
    // prefer admin role if it exists
    if (_.contains(user.roles, 'admin'))
      role = 'admin'
    return role
  }
})