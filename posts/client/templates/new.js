AutoForm.hooks({
  insertPostForm: {
    before: {

    },

    onSuccess: function (formType, result) {
      Router.go('/')
    }
  }
})