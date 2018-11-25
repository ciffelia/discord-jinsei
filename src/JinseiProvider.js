const { DateTime } = require('luxon')
const config = require('../config')

class JinseiProvider {
  static GetElapsed () {
    return this.birthday.diffNow().negate()
  }
}

JinseiProvider.birthday = DateTime.fromObject(config.birth)

module.exports = JinseiProvider
