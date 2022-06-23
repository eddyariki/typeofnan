export interface PostMdFileParserInterface {
  convertToHTML: (mdFile: Blob) => Promise<string>
}
