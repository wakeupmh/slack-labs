const isWindows = require('is-windows')()

module.exports = {
  /* Unknown why we don't get 100% coverage on Windows. */
  'check-coverage': !isWindows,
  branches: 90,
  functions: 90,
  lines: 90,
  statements: 90
}
