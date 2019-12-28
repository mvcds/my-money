#!/usr/bin/env node
// ADAPTED FROM https://www.custardbelly.com/blog/blog-posts/2014/01/29/cucumberjs-build/index.html
var watch = require('node-watch');
var child_process = require('child_process');
var running = false;
var cucumber;

watch('.', { recursive: true }, function(evt, filename) {
  if (running) return

  running = true;

  cucumber = child_process.spawn('yarn', ['test'],  {stdio: "inherit"})
    .on('exit', function() {
      running = false;
    });
});
