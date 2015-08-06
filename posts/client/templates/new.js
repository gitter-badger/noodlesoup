AutoForm.hooks({
  insertPostForm: {
    before: {
      insert: function (doc) {
        doc.author = Meteor.user().username
        doc.createdAt = new Date()
        return doc
      }
    },

    onSuccess: function (formType, result) {
      Router.go('/')
    }
  }
})