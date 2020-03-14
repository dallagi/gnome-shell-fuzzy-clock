const assert = require('assert')
const { FuzzyTime } = require('../lib/fuzzy_time')

describe('FuzzyTime', () => {
  const RealDate = Date

  function mockTime (time) {
    const isoDate = `2000-01-01T${time}:00`
    global.Date = class extends RealDate {
      constructor () {
        return new RealDate(isoDate)
      }
    }
  }

  afterEach(() => {
    global.Date = RealDate
  })

  beforeEach(() => {
  })

  describe('#toString()', () => {
    it('should return <time> o\'clock when minutes are 00', () => {
      mockTime('05:00')
      assert.strictEqual(new FuzzyTime().toString(), "five o'clock")
    })

    it('should round time down when nearest 5-minutes are in the past', () => {
      mockTime('05:02')
      assert.strictEqual(new FuzzyTime().toString(), "five o'clock")
    })

    it('should round time up when nearest 5-minutes are in the future', () => {
      mockTime('05:03')
      assert.strictEqual(new FuzzyTime().toString(), 'five past five')
    })

    it('should reference upcoming hour for later minutes', () => {
      mockTime('05:55')
      assert.strictEqual(new FuzzyTime().toString(), 'five to six')
    })

    it('should support internationalization', () => {
      mockTime('05:00')
      const translations = { "%0 o'clock": '%0 in punto', five: 'cinque' }
      const translateStringStub = s => translations[s]

      assert.strictEqual(new FuzzyTime(translateStringStub).toString(), 'cinque in punto')
    })
  })
})
