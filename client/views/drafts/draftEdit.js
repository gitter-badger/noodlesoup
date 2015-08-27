Template.draftEdit.helpers({
  getDoc: function () {
    return this
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