import { centuryFromNow } from './time'

describe('TimeUtils', () => {
  describe('centuryFromNow', () => {
    test('returns a time when we will all be dead', () => {
      const result = centuryFromNow()
      const now = new Date()
      const diff = result.getTime() - now.getTime()

      const DAY = 60 * 60 * 24 * 1000
      const YEAR = 365 * DAY

      expect(diff).toBeGreaterThan(YEAR * 99)
    })
  })
})
