#!/usr/bin/env ruby

case $*[0]
when 'run'
  exec('meteor --settings mup/production/settings.json')
when 'dep'
  exit if $*[1].nil?
  Dir.chdir 'mup/' + $*[1]
  exec('mup deploy')
end