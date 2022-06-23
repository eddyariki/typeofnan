import { calculateReadTime } from '../../../../lib/presenters/post/calculateReadTime'

export {}

describe('calculateReadTime', () => {
  it('should return the readtime of some text in minutes', () => {
    const text = Array.from(new Array(400), (val, index) => '<h1>text</h1>').join(' ')
    const readTime = calculateReadTime(text)
    expect(readTime).toBe(2)
  })
  it('should return 1 for text equal to 200 texts long', () => {
    const text = Array.from(new Array(200), (val, index) => '<h1>text</h1>').join(' ')
    const readTime = calculateReadTime(text)
    expect(readTime).toBe(1)
  })
  it('should return 1 for text equal to 100 texts long', () => {
    const text = Array.from(new Array(100), (val, index) => '<h1>text</h1>').join(' ')
    const readTime = calculateReadTime(text)
    expect(readTime).toBe(1)
  })
  it('should return 0 for text smaller than 100 texts long', () => {
    const text = Array.from(new Array(99), (val, index) => '<h1>text</h1>').join(' ')
    const readTime = calculateReadTime(text)
    expect(readTime).toBe(0)
  })
})
