var path = require('path')
var fs = require('fs')
var vfs = require('vinyl-fs')
var through = require('through2')
var logger = require('./logger')

function template(dest, cwd) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb()
    }

    logger.log('create ' + file.path.replace(cwd + '/', ''))
    this.push(file)
    cb()
  })
}

module.exports = function(cwd, dest, done) {
  console.log()

  vfs.src(['**/*', '!node_modules/**/*', '!build/**/*', '!doc/**/*', '!mock2easy/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest, cwd))
    .pipe(vfs.dest(dest))
    .on('end', function() {
      logger.log('rename ' + 'gitignore -> .gitignore')
      fs.renameSync(path.join(dest, 'gitignore'), path.join(dest, '.gitignore'))

      done()

    })
    .resume();
}
