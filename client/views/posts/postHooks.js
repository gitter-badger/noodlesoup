AutoForm.hooks({
  insertPostForm: {
    before: {
      insert: function (doc) {
        doc.authorId = Meteor.userId()
        doc.createdAt = App.methods.getTimestamp(new Date())
        doc.summary = 'My great summary'
        doc.date = new Date()
        doc.body = 'You can use _Markdown_ in your posts!'
        return doc
      }
    },

    onSuccess: function (formType, result) {
      Router.go('/write/drafts/' + Posts.findOne({_id: result}).slug)
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