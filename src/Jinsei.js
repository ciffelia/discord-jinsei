const { DateTime } = require('luxon')

class Jinsei {
  constructor (birth) {
    this.birth = DateTime.fromObject(birth)
  }

  today () {
    return DateTime.local().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  }

  elapsed () {
    return this.today().diff(this.birth, ['years', 'months', 'days'])
  }

  nextBirthday () {
    const today = this.today()
    const birthdayThisYear = this.birth.set({ year: today.year })
    const birthdayNextYear = this.birth.set({ year: today.year + 1 })

    if (today <= birthdayThisYear) {
      return birthdayThisYear
    } else {
      return birthdayNextYear
    }
  }

  durationToNextBirthday () {
    return this.nextBirthday().diff(this.today(), ['years', 'months', 'days'])
  }
}

module.exports = Jinsei
