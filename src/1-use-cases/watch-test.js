#!/usr/bin/env node
// ADAPTED FROM https://www.custardbelly.com/blog/blog-posts/2014/01/29/cucumberjs-build/index.html
var watch = require('node-watch')
var childProcess = require('child_process')
var running = false

watch('.', { recursive: true }, function (evt, filename) {
  if (running) return

  running = true

  childProcess.spawn('yarn', ['test'], { stdio: 'inherit' })
    .on('exit', function () {
      running = false
    })
})
