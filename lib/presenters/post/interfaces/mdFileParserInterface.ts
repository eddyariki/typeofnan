export interface MdFileParserInterface {
  parse: (mdFileText: string) => Promise<string>
}
