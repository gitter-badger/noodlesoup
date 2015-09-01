/**
 * General draft JS
 * Bigger JS chunks are in their own JS file
 */

 /*=====================================
 =            DRAFT LISTING            =
 =====================================*/
 
Template.draftList.helpers({
  drafts: function () {
    return Posts.find({draft: true})
  }
})

Template.draftListOne.helpers({
  getAuthor: function (id) {
    return Users.findOne({_id: id}).username
  }
})

/*=====================================
=            DRAFT EDITING            =
=====================================*/

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
    Posts.update({_id: this._id}, {$set: {
      summary: form.summary.value,
      disclaimer: form.disclaimer ? form.disclaimer.value : undefined,
      body: form.body.value,
      tag: form.tag.value
    }})
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