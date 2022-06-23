import { PostMdFileParser } from '../../../../lib/presenters/post/postMdFileParser'
import { MdFileParserInterface } from '../../../../lib/presenters/post/interfaces/mdFileParserInterface'
import 'blob-polyfill'

export {}

class MockMdFileParser implements MdFileParserInterface {
  constructor() {}

  parse = async (mdFileText: string) => {
    return '<h1>Test</h1>'
  }
}

describe('PostMdFileParser', () => {
  let postMdFileParser: PostMdFileParser
  let mdFileParser: MdFileParserInterface
  beforeEach(() => {
    mdFileParser = new MockMdFileParser()
    postMdFileParser = new PostMdFileParser(mdFileParser)
    jest.spyOn(mdFileParser, 'parse')
  })
  describe('convertToHTML', () => {
    it("should call the mdFileParser's parse method with mdFileText", async () => {
      const _ = await postMdFileParser.convertToHTML(new Blob(['# Test']))
      expect(mdFileParser.parse).toHaveBeenCalledWith('# Test')
    })

    it('should convert the markdown file to HTML text', async () => {
      const htmlText = await postMdFileParser.convertToHTML(new Blob(['# Test']))
      expect(htmlText).toBe('<h1>Test</h1>')
    })
  })
})
