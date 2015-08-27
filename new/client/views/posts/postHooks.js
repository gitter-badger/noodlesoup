AutoForm.hooks({
  insertPostForm: {
    before: {
      insert: function (doc) {
        doc.authorId = Meteor.userId()
        doc.createdAt = Noodlesoup.methods.getTimestamp(new Date())
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
        doc.$set.body = $('.epicarea').val()
        return doc
      }
    },

    onSuccess: function (formType, result) {
      Router.go('/p/' + this.currentDoc.slug)
    }
  }
})