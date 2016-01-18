/**
 * Modules
 */

var fs = require('fs')
var path = require('path')

/**
 * Vars
 */

var modulePath = path.join(process.cwd(), 'node_modules')

/**
 * Expose nodeDeps
 */

module.exports = nodeDeps

/**
 * nodeDeps
 */

function nodeDeps (dir) {
  dir = dir || modulePath

  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir)
    .filter(function (mod) {
      return mod !== '.bin'
    })
    .reduce(function (acc, mod) {
      if (mod[0] === '@') {
        return acc.concat(
          nodeDeps(path.join(dir, mod))
            .map(function (scoped) {
              return path.join(mod, scoped)
            }))
      }

      acc.push(mod)
      return acc
    }, [])
}
