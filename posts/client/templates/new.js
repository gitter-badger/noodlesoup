AutoForm.hooks({
  insertPostForm: {
    onSuccess: function (formType, result) {
      Router.go('/')
    }
  }
})