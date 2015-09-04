#!/usr/bin/env ruby

case $*[0]
when 'run', nil
  exec('meteor --settings mup/production/settings.json')
when 'dep'
  raise 'No environment supplied! Try "production".' if $*[1].nil?
  Dir.chdir 'mup/' + $*[1]
  exec('mup deploy')
end