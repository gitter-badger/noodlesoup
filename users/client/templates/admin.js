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
  'click #give': function () {
    Roles.addUsersToRoles(this._id, event.target.getAttribute('data-give'))
  },
  'click #remove': function () {
    Roles.removeUsersFromRoles(this._id, event.target.getAttribute('data-remove'))
  }
})