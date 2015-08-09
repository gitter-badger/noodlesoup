Posts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()
Users.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()