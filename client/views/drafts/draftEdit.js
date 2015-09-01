function save (form, id) {
  Posts.update({_id: id}, {$set: {
    summary: form.summary.value,
    disclaimer: form.disclaimer ? form.disclaimer.value : undefined,
    body: $('.epicarea').val(),
    tag: form.tag.value
  }})
}

Template.draftEdit.helpers({
  getDoc: function () {
    return this
  },
  tags: function () {
    var r = []
    App.tags.forEach(function (e) {
      r.push({value: e, label: e})
    })
    return r
  }
})

Template.draftEdit.events({
  'click .save': function (event) {
    event.preventDefault()
    var form = $('#reviewPostForm')[0]
    save(form, this._id)
  }
})

Template.draftEdit.onRendered(function () {
  setInterval(function () {
    var form = $('#reviewPostForm')[0]
    save(form, $(form).find('input[name="id"]').val())
  }, 20000)
})

AutoForm.addHooks('reviewPostForm', {
  before: {
    update: function (doc) {
      doc.$set.draft = false
      doc.$set.body = $('.epicarea').val()
      return doc
    }
  },
  onSuccess: function (formType, result) {
    Router.go('/p/' + this.currentDoc.slug)
  }
})