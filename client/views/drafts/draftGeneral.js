/**
 * General draft JS
 * Bigger JS chunks are in their own JS file
 */

 /*=====================================
 =            DRAFT LISTING            =
 =====================================*/
 
Template.draftList.helpers({
  drafts: function () {
    return Posts.find({draft: true})
  }
})

Template.draftListOne.helpers({
  getAuthor: function (id) {
    return Users.findOne({_id: id}).username
  }
})

AutoForm.addHooks('reviewPostForm', {
  before: {
    update: function (doc) {
      doc.$set.draft = false
      return doc
    }
  },
  onSuccess: function (formType, result) {
    Router.go('/p/' + this.currentDoc.slug)
  }
})