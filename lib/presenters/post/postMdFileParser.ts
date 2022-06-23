import { MdFileParserInterface } from './interfaces/mdFileParserInterface'
import { PostMdFileParserInterface } from './interfaces/postMdFileParserInterface'

export class PostMdFileParser implements PostMdFileParserInterface {
  constructor(private parser: MdFileParserInterface) {}

  convertToHTML = async (mdFile: Blob) => {
    const mdFileText = await mdFile.text()
    return this.parser.parse(mdFileText)
  }
}
