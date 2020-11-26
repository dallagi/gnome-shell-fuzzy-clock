/* eslint-disable no-undef */
const _ = imports.gettext.domain('Fuzzy_Clock@dallagi').gettext;
/* eslint-enable no-undef */

const hoursList = [
  _("%0 o'clock"),
  _('five past %0'),
  _('ten past %0'),
  _('quarter past %0'),
  _('twenty past %0'),
  _('twenty five past %0'),
  _('half past %0'),
  _('twenty five to %1'),
  _('twenty to %1'),
  _('quarter to %1'),
  _('ten to %1'),
  _('five to %1'),
  _("%1 o'clock")
]

const hourNames = [
  _('twelve'),
  _('one'),
  _('two'),
  _('three'),
  _('four'),
  _('five'),
  _('six'),
  _('seven'),
  _('eight'),
  _('nine'),
  _('ten'),
  _('eleven'),
  _('twelve')
]

var FuzzyTime = class {
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

// export for testing
if (typeof exports !== 'undefined') {
  exports.FuzzyTime = FuzzyTime
}
