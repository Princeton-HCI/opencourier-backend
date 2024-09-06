import { cuidToHumanReadableId } from './ids'

describe('ID utils', () => {
  describe('cuidToHumanReadableId', () => {
    test('converts a valid cuid', () => {
      const cuid = 'cloluioqn0006xgbmgpufqsvy'
      expect(cuidToHumanReadableId(cuid)).toBe('PUFQSVY')
    })
  })
})
