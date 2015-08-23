Template.draftsList.helpers({
  drafts: function () {
    return Posts.find({draft: true})
  }
})

Template.draftListOne.helpers({
  getAuthor: function (id) {
    return Users.findOne({_id: id}).username
  }
})