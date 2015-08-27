Template.userTokenGen.events({
  'click #gen-button': function (event) {
    var newToken = Random.id(10)
    Tokens.insert({token: newToken})
    $('#gen-header span').text(newToken)
    $('#gen-button').hide()
  }
})