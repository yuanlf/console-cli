var request = require('request')
var semver = require('semver')
var chalk = require('chalk')
var packageConfig = require('../package.json')

module.exports = function(done) {
  function parseVersionNumber (versionString) {
    return parseFloat(versionString.replace(/[^\d\.]/g, ''))
  }

  var minNodeVersion = parseVersionNumber(packageConfig.engines.node)
  var currentNodeVersion = parseVersionNumber(process.version)

  if (minNodeVersion > currentNodeVersion) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + minNodeVersion + '.x to use console-cli'
    ))
  }

  request({
    url: 'https://registry.npmjs.org/console-cli',
    timeout: 1000
  }, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var latestVersion = JSON.parse(body)['dist-tags'].latest
      var localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of console-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }
    }

    done();
  })
}
