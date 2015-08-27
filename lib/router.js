function redPR (self) {
  if (!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'pr')) {
    self.redirect('/')
  }
}

function redWrt (self) {
  if (!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'writer')) {
    self.render('404')
  }
}

function isAdmin () {
  return _.contains(Users.findOne({_id: Meteor.userId()}).roles, 'admin')
}

function userExists (username) {
  return Users.findOne({username: username})
}

Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
})

Router.route('/', function () {
  this.render('postLatest')
})

Router.route('/about', function () {
  this.render('staticAbout')
})

Router.route('/logout', function () {
  AccountsTemplates.logout()
})

Router.route('/write/drafts', function () {
  redPR(this)
  this.render('draftList')
})

Router.route('/write/drafts/:post_slug', function () {
  redPR(this)
  this.render('draftEdit', {
    data: function () {
      return Posts.findOne({slug: this.params.post_slug})
    }
  })
})

Router.route('/reviews', function () {
  this.render('postTag', {
    data: {
      tag_name: 'episode review'
    }
  })
})

Router.route('/p/:post_slug', function () {
  this.render('postOne', {
    data: function () {
      return Posts.findOne({slug: this.params.post_slug})
    }
  })
})

Router.route('/t/:tag_name', function () {
  this.render('postTag', {
    data: {
      tag_name: this.params.tag_name
    }
  })
})

Router.route('/a/:author_name', function () {
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

Router.route('/write/new', function () {
  redWrt(this)
  this.render('postNew')
})

Router.route('/write/guidelines', function () {
  redWrt(this)
  this.render('postGuidelines')
})

Router.route('/p/:post_slug/edit', function () {
  redWrt(this)
  var post = Posts.findOne({slug: this.params.post_slug})
  // make sure only the creator can edit
  if (Users.findOne({_id: post.authorId}).username !== Meteor.user().username) {
    this.redirect('/p/' + this.params.post_slug)
  }
  this.render('postEdit', {
    data: function () {
      return post
    }
  })
})

Router.route('/settings/general', function () {
  if (Meteor.userId()) {
    this.render('userEdit')
  } else {
    this.render('404')
  }
})

Router.route('/gentoken', function () {
  if (Meteor.userId() && isAdmin()) {
    this.render('userTokenGen')
  } else {
    this.render('404')
  }
})

Router.route('/a/:user_name/edit', function () {
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