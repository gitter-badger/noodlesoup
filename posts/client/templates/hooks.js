AutoForm.hooks({
  insertPostForm: {
    before: {
      insert: function (doc) {
        doc.author = Meteor.user().username
        doc.createdAt = Noodlesoup.methods.getTimestamp(new Date())
        return doc
      }
    },

    onSuccess: function (formType, result) {
      Router.go('/')
    }
  },
  updatePostForm: {
    onSuccess: function (formType, result) {
      Router.go('/p/' + this.currentDoc.slug)
    }
  }
})