/**
 * General draft JS
 * Bigger JS chunks are in their own JS file
 */

 /*=====================================
 =            DRAFT LISTING            =
 =====================================*/
 
Template.draftList.helpers({
  drafts: function () {
    if (Roles.userIsInRole(Meteor.userId(), 'writer') && !Roles.userIsInRole(Meteor.userId(), 'pr'))
      return Posts.find({draft: true, authorId: Meteor.userId()})
    else
      return Posts.find({draft: true})
  }
})

Template.draftListOne.helpers({
  getAuthor: function (id) {
    return Users.findOne({_id: id}).username
  }
})