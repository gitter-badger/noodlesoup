#Noodlesoup
Noodlesoup is a multi-user blogging platform that was used to power the blog at [noodlesoup.moe](http://noodlesoup.moe).

##Local installation
1. Download or clone this repository (`git clone http://github.com/ix/noodlesoup`)
2. Make sure you have [Meteor](http://meteor.com) and Ruby installed.
3. Execute `ruby ctl` in the cloned directory.
On first run, an initial user named **admin** with the password **supersecret** is generated. This user has, obviously, admin capabilities. You can change the username, password and email once you're logged in.

##Adding users
Visit `http://localhost:3000/gentoken` when you're logged in as an admin. Give the generated token to the user you want to sign up.