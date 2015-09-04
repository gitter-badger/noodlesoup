/**
 * All the routes.
 */


function redRole (role) {
  if (!isRole(role)) {
    this.redirect('/404')
  }
}

function redRoles (roles) {
  if (!roles.some(function (e) {
    return isRole(e)
  }))
    this.redirect('/404')
}

function isRole (role) {
  // TODO: figure out why the Roles method doesn't work
  return _.contains(Users.findOne({_id: Meteor.userId()}).roles, role)
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

Router.route('/launch', function () {
  this.layout('')
  this.render('staticLaunch')
})

Router.route('/', function () {
  setTitle("Your home for anime") //- Set the title
  /* The main route that renders the latest post list */
  this.render('postLatest')
})

Router.route('/about', function () {
  setTitle("About Us") //- Set the title
  /* Renders the about page */
  this.render('staticAbout')
})

/*=====================================
=            WRITER ROUTES            =
=====================================*/

Router.route('/write/drafts', function () {
  /* Renders the drafts list (only for PRs) */
  redRoles.call(this, ['writer', 'pr'])
  this.render('draftList')
})

Router.route('/write/drafts/:post_slug', function () {
  /* Renders a single draft */
  redRoles.call(this, ['writer', 'pr'])
  if (isRole('admin') || isRole('pr')) {
    this.render('draftEdit', {
      data: function () {
        return Posts.findOne({slug: this.params.post_slug})
      }
    })
  } else {
    if (isRole('writer') && Posts.findOne({slug: this.params.post_slug}).authorId !== Meteor.userId())
      this.redirect('/404')
    else
      this.render('draftEdit', {
        data: function () {
          return Posts.findOne({slug: this.params.post_slug})
        }
      })
  }
})

Router.route('/write/new', function () {
  /* Renders the new post page (only for writers) */
  redRole.call(this, 'writer')
  this.render('postNew')
})

Router.route('/write/guidelines', function () {
  /* Renders the guidelines (only for writers) */
  redRole.call(this, 'writer')
  this.render('postGuidelines')
})

Router.route('/p/:post_slug/edit', function () {
  /* Renders the edit page for individual posts (only for the post author) */
  redRole.call(this, 'writer')
  var post = Posts.findOne({slug: this.params.post_slug})
  // if (Users.findOne({_id: post.authorId}).username !== Meteor.user().username) {
  //   this.redirect('/p/' + this.params.post_slug)
  // }
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
  setTitle("Reviews") //- Set the title
  /* Renders the tag page for episode reviews */
  this.render('postTag', {
    data: {
      tag_name: 'episode review'
    }
  })
})

Router.route('/spotlights', function () {
  setTitle("Spotlights") //- Set the title
  /* Renders the tag page for spotlights */
  // TODO: create a separate template for these
  this.render('postTag', {
    data: {
      tag_name: 'spotlight'
    }
  })
})

Router.route('/p/:post_slug', function () {
  if (Posts.findOne({slug: this.params.post_slug}).draft)
    this.redirect('/404')
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
  setTitle("Settings") //- Set the title
  /* Renders the user settings, like changing the profile or password */
  if (Meteor.userId()) {
    this.render('userEdit')
  } else {
    this.render('404')
  }
})

Router.route('/gentoken', function () {
  /* Renders the token generation page (only for admins) */
  if (Meteor.userId() && isRole('admin')) {
    this.render('userTokenGen')
  } else {
    this.render('404')
  }
})

Router.route('/a/:user_name/edit', function () {
  /* Renders the page to edit user roles (only for admins) */
  if (Meteor.userId() && isRole('admin') && userExists(this.params.user_name)) {
    this.render('userAdmin', {
      data: function () {
        return Users.findOne({username: this.params.user_name})
      }
    })
  } else {
    this.render('404')
  }
})

/*===========================================
=  Setting title for general routes         =
===========================================*/

function setTitle (title) {
  document.title = title + " | Noodlesoup";
}