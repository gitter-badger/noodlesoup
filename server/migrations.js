Migrations.add({
  version: 1,
  up: function () {
    Users.find({}).forEach(function (user) {
      var rank
      if (user.roles) {
        if (user.roles.indexOf('pr') !== -1 && user.roles.indexOf('writer') === -1)
          rank = 2
        if (user.roles.indexOf('writer') !== -1 && user.roles.indexOf('pr') === -1)
          rank = 3
        if (user.roles.indexOf('writer') !== -1 && user.roles.indexOf('pr') !== -1)
          rank = 4
        if (user.roles.indexOf('admin') !== -1)
          rank = 5
        if (!rank)
          rank = 1
      } else {
        if (!user.rank)
          rank = 1
        else
          rank = user.rank
      }
      Users.update({_id: user._id}, {$set: {
        rank: rank
      }})
    })
  }
})

Meteor.startup(function () {
  Migrations.migrateTo('latest')
})