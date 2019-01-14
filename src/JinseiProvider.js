const { DateTime } = require('luxon')
const config = require('../config')

class JinseiProvider {
  static Today () {
    return DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  }

  static GetElapsed () {
    return this.Today().diff(this.Birthdate)
  }
}

JinseiProvider.Birthdate = DateTime.fromObject(config.birthdate)

module.exports = JinseiProvider
