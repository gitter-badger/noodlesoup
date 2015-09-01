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