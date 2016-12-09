var chalk = require('chalk')
var format = require('util').format

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
exports.log = function () {
  var msg = format.apply(format, arguments)
  console.log(chalk.cyan(msg))
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */
exports.fatal = function (message) {
  if (message instanceof Error) message = message.message.trim()
  var msg = format.apply(format, arguments)
  console.error(chalk.red(msg))
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function () {
  var msg = format.apply(format, arguments)
  console.log(chalk.green(msg))
}
