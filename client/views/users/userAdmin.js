Template.userAdmin.helpers({
  isNotAdmin: function () {
    if (!Roles.userIsInRole(this._id, 'admin')) {
      return true
    } else {
      return false
    }
  },
  isWriter: function () {
    if (Roles.userIsInRole(this._id, 'writer')) {
      return true
    } else {
      return false
    }
  },
  isPR: function () {
    if (Roles.userIsInRole(this._id, 'pr')) {
      return true
    } else {
      return false
    }
  }
})

Template.userAdmin.events({
  'click #give': function (event, template) {
    Roles.addUsersToRoles(template.data._id, event.target.getAttribute('data-give'))
  },
  'click #remove': function (event, template) {
    Roles.removeUsersFromRoles(template.data._id, event.target.getAttribute('data-remove'))
  }
})