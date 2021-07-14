import { DateTime, Duration } from 'luxon'
import { PlainDate } from './Config'

class Jinsei {
  private readonly birth: DateTime

  constructor(birth: PlainDate) {
    this.birth = DateTime.fromObject(birth)
  }

  today(): DateTime {
    return DateTime.local().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    })
  }

  elapsed(): Duration {
    return this.today().diff(this.birth, ['years', 'months', 'days'])
  }

  nextBirthday(): DateTime {
    const today = this.today()
    const birthdayThisYear = this.birth.set({ year: today.year })
    const birthdayNextYear = this.birth.set({ year: today.year + 1 })

    if (today <= birthdayThisYear) {
      return birthdayThisYear
    } else {
      return birthdayNextYear
    }
  }

  durationToNextBirthday(): Duration {
    return this.nextBirthday().diff(this.today(), ['years', 'months', 'days'])
  }
}

export default Jinsei
