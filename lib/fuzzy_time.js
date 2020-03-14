
const hoursList = [
  "%0 o'clock",
  'five past %0',
  'ten past %0',
  'quarter past %0',
  'twenty past %0',
  'twenty five past %0',
  'half past %0',
  'twenty five to %1',
  'twenty to %1',
  'quarter to %1',
  'ten to %1',
  'five to %1',
  "%1 o'clock"
]

const hourNames = [
  'twelve',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve'
]

class FuzzyTime {
  constructor (translateString = s => s) {
    this.now = new Date()
    this.fuzzyTimeTemplates = hoursList.map(translateString)
    this.hourNames = hourNames.map(translateString)
  }

  toString () {
    return this._fuzzyTimeTemplate()
      .replace('%0', this._currentHourName())
      .replace('%1', this._nextHourName())
  }

  _fuzzyTimeTemplate () {
    return this.fuzzyTimeTemplates[this._fiveMinutesBucket()]
  }

  _currentHourName () {
    const hours = this.now.getHours()
    return this.hourNames[hours >= 12 ? hours - 12 : hours]
  }

  _nextHourName () {
    const hours = this.now.getHours()
    return this.hourNames[hours + 1 >= 12 ? hours + 1 - 12 : hours + 1]
  }

  _fiveMinutesBucket () {
    const minutes = this.now.getMinutes()
    return Math.round(minutes / 5)
  }
}

exports.FuzzyTime = FuzzyTime
