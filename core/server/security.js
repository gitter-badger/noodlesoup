Posts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()
Meteor.users.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()