const { DateTime } = require('luxon')
const config = require('../config')

class JinseiProvider {
  static Today () {
    return DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  }

  static GetElapsed () {
    return this.Today().diff(this.Birthdate, ['years', 'months', 'days'])
  }

  static GetDurationToNextBirthday () {
    const today = this.Today()

    const birthdayInThisYear = this.Birthdate.set({ year: today.year })
    const birthdayInNextYear = this.Birthdate.set({ year: today.year + 1 })
    const nextBirthday = today <= birthdayInThisYear ? birthdayInThisYear : birthdayInNextYear

    return nextBirthday.diff(today, ['years', 'months', 'days'])
  }
}

JinseiProvider.Birthdate = DateTime.fromObject(config.birth)

module.exports = JinseiProvider
