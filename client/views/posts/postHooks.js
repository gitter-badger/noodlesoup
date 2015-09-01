AutoForm.hooks({
  insertPostForm: {
    before: {
      insert: function (doc) {
        doc.authorId = Meteor.userId()
        doc.createdAt = App.methods.getTimestamp(new Date())
        doc.date = new Date()
        doc.body = $('.epicarea').val()
        return doc
      }
    },

    onSuccess: function (formType, result) {
      Router.go('/')
    }
  },
  updatePostForm: {
    before: {
      update: function (doc) {
        doc.$set.body = 'You can use _Markdown_ in your post!'
        return doc
      }
    },

    onSuccess: function (formType, result) {
      Router.go('/p/' + this.currentDoc.slug)
    }
  }
})