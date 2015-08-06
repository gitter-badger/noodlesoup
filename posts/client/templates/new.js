AutoForm.hooks({
  insertPostForm: {
    before: {
      insert: function (doc) {
        doc.author = Meteor.user().username
        return doc
      }
    },

    onSuccess: function (formType, result) {
      Router.go('/')
    }
  }
})