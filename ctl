#!/usr/bin/env node

// Noodlesoup control script. Use with 'ctl <command>',
// 'node ctl <command>' on Windows.
// Accepted commands:
// run - run a development instance. Requires meteor to
// be in the PATH.
// deploy <env> - leverages mup deploy to deploy to the
// specified environment. mup deploy files need to be present
// in the mup/<env> folder

var exec = require('child_process').exec
  , args = process.argv.slice(2)
  , child

switch (args[0]) {
  case 'run':
    child = exec('meteor --settings mup/production/settings.json')
    break
  case 'deploy':
    if (args[1]) {
      process.chdir('/mup')
      process.chdir('/' + args[1])
      exec('mup deploy')
    } else {
      throw new Error('ctl deploy needs a deploy target!')
    }
    break
}

child.stdout.on('data', function (data) {
  console.log(data)
})