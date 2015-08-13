Template.draftsList.helpers({
  drafts: function () {
    return Posts.find({draft: true})
  }
})