import { convertUnixToDatetimeSting } from '../../../../lib/presenters/post/convertUnixToDatetimeString'

export {}

describe('convertUnixToDatetimeString', () => {
  it('should convert unix seconds to datetime string', () => {
    const datetimeString = convertUnixToDatetimeSting(0)
    expect(datetimeString).toBe('Thu Jan 01 1970')
  })
  it('should return the first date point for negative numbers', () => {
    const datetimeString = convertUnixToDatetimeSting(-1)
    expect(datetimeString).toBe('Thu Jan 01 1970')
  })
  it('should return Invalid Date for future dates', () => {
    const datetimeString = convertUnixToDatetimeSting(111111111111111)
    expect(datetimeString).toBe('Invalid Date')
  })
})
