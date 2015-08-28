function redRole (role) {
  if (!Meteor.userId() && Roles.userIsInRole(Meteor.userId(), role)) {
    this.redirect('404')
  }
}

function isAdmin () {
  // TODO: figure out why the Roles method doesn't work
  return _.contains(Users.findOne({_id: Meteor.userId()}).roles, 'admin')
}

function userExists (username) {
  return Users.findOne({username: username})
}

/*=====================================
=            CONFIGURATION            =
=====================================*/

Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
})

/*======================================
=            GENERAL ROUTES            =
======================================*/

Router.route('/', function () {
  /* The main route that renders the latest post list */
  this.render('postLatest')
})

Router.route('/about', function () {
  /* Renders the about page */
  this.render('staticAbout')
})

/*=====================================
=            WRITER ROUTES            =
=====================================*/

Router.route('/write/drafts', function () {
  /* Renders the drafts list (only for PRs) */
  redRole.bind(this, 'pr')
  this.render('draftList')
})

Router.route('/write/drafts/:post_slug', function () {
  /* Renders a single draft (only for PRs) */
  redRole.bind(this, 'pr')
  this.render('draftEdit', {
    data: function () {
      return Posts.findOne({slug: this.params.post_slug})
    }
  })
})

Router.route('/write/new', function () {
  /* Renders the new post page (only for writers) */
  redRole.bind(this, 'writer')
  this.render('postNew')
})

Router.route('/write/guidelines', function () {
  /* Renders the guidelines (only for writers) */
  redRole.bind(this, 'writer')
  this.render('postGuidelines')
})

Router.route('/p/:post_slug/edit', function () {
  /* Renders the edit page for individual posts (only for the post author) */
  redRole.bind(this, 'writer')
  var post = Posts.findOne({slug: this.params.post_slug})
  if (Users.findOne({_id: post.authorId}).username !== Meteor.user().username) {
    this.redirect('/p/' + this.params.post_slug)
  }
  this.render('postEdit', {
    data: function () {
      return post
    }
  })
})

/*===========================================
=            POST DISPLAY ROUTES            =
===========================================*/

Router.route('/reviews', function () {
  /* Renders the tag page for episode reviews */
  this.render('postTag', {
    data: {
      tag_name: 'episode review'
    }
  })
})

Router.route('/p/:post_slug', function () {
  /* Renders a single post */
  this.render('postOne', {
    data: function () {
      return Posts.findOne({slug: this.params.post_slug})
    }
  })
})

Router.route('/t/:tag_name', function () {
  /* Renders all posts belonging to a tag */
  this.render('postTag', {
    data: {
      tag_name: this.params.tag_name
    }
  })
})

Router.route('/a/:author_name', function () {
  /* Renders all post belonging to an author */
  if (Users.findOne({username: this.params.author_name})) {
    this.render('postAuthor', {
      data: {
        author_name: this.params.author_name
      }
    })
  } else {
    this.render('404')
  }
})

/*===================================
=            USER ROUTES            =
===================================*/

Router.route('/logout', function () {
  /* Logs the user out */
  AccountsTemplates.logout()
})

Router.route('/settings/general', function () {
  /* Renders the user settings, like changing the profile or password */
  if (Meteor.userId()) {
    this.render('userEdit')
  } else {
    this.render('404')
  }
})

Router.route('/gentoken', function () {
  /* Renders the token generation page (only for admins) */
  if (Meteor.userId() && isAdmin()) {
    this.render('userTokenGen')
  } else {
    this.render('404')
  }
})

Router.route('/a/:user_name/edit', function () {
  /* Renders the page to edit user roles (only for admins) */
  if (Meteor.userId() && isAdmin() && userExists(this.params.user_name)) {
    this.render('userAdmin', {
      data: function () {
        return Users.findOne({username: this.params.user_name})
      }
    })
  } else {
    this.render('404')
  }
})