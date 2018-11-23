const { DateTime } = require('luxon')

class JinseiProvider {
  static GetElapsed () {
    return this.birthday.diffNow().negate()
  }
}

JinseiProvider.birthday = DateTime.fromObject({
  year: 2002,
  month: 2,
  day: 3,
  zone: 'Asia/Tokyo'
})

module.exports = JinseiProvider
