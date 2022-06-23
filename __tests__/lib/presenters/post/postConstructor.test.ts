import { PostMdFileInteractor } from '../../../../lib/interactors/post/postMdFileInteractor'
import { PostMetadataInteractor } from '../../../../lib/interactors/post/postMetadataInteractor'
import { PostConstructorInterface } from '../../../../lib/interfaces/presenters/post/postConstructorInterface'
import { PostMdFileAdapterInterface } from '../../../../lib/interfaces/postMdFile/postMdFileAdapterInterface'
import { PostMdFileInteractorInterface } from '../../../../lib/interfaces/postMdFile/postMdFileInteractorInterface'
import { PostMetadataAdapterInterface } from '../../../../lib/interfaces/postMetadata/postMetadataAdapterInterface'
import { PostMetadataInteractorInterface } from '../../../../lib/interfaces/postMetadata/postMetadataInteractorInterface'
import { PostMdFile, PostMetadata, ProcessedPost } from '../../../../lib/interfaces/post/post'
import { MdFileParserInterface } from '../../../../lib/presenters/post/interfaces/mdFileParserInterface'
import { PostConstructor } from '../../../../lib/presenters/post/postConstructor'
import { PostMdFileParser } from '../../../../lib/presenters/post/postMdFileParser'
import { PostMdFileParserInterface } from '../../../../lib/presenters/post/interfaces/postMdFileParserInterface'

export {}

const dummyPostMetadata: PostMetadata = {
  id: '0',
  tags: ['test'],
  title: 'test',
  author: 'tester',
  version: 1,
  markdownFileURI: 'this.location',
  createdAt: 11111111,
  isPublished: true
}
const dummyPostMdFile: PostMdFile = {
  markdownFile: new Blob()
}
class MockMdFileAdapter implements PostMdFileAdapterInterface {
  constructor() {}

  get = async ({ uri }: { uri: string }) => {
    if (uri === '-9999') return undefined
    return dummyPostMdFile
  }
}

class MockPostMetadataAdapter implements PostMetadataAdapterInterface {
  constructor() {}

  get = async ({ id }: { id: string }) => {
    if (id === '1') return dummyPostMetadata
    return undefined
  }

  getAll = async () => {
    return [dummyPostMetadata]
  }
}

class MockMdFileParser implements PostMdFileParserInterface {
  convertToHTML = async (mdFile: Blob) => '<h1>test</h1>'
}

describe('PostConstructor', () => {
  let postConstructor: PostConstructorInterface
  let postMdFileInteractor: PostMdFileInteractorInterface
  let postMetadataInteractor: PostMetadataInteractorInterface
  let mdFileParser: MockMdFileParser
  beforeEach(() => {
    postMetadataInteractor = new PostMetadataInteractor(new MockPostMetadataAdapter())
    postMdFileInteractor = new PostMdFileInteractor(new MockMdFileAdapter())
    mdFileParser = new MockMdFileParser()
    postConstructor = new PostConstructor(
      postMetadataInteractor,
      postMdFileInteractor,
      mdFileParser
    )

    jest.spyOn(postMetadataInteractor, 'get')
    jest.spyOn(postMdFileInteractor, 'get')
    jest.spyOn(mdFileParser, 'convertToHTML')
  })

  describe('get()', () => {
    it("should call each postMetadataInteractor's get method with id", async () => {
      const _ = await postConstructor.getProcessedPost({ id: '1' })
      expect(postMetadataInteractor.get).toHaveBeenCalledWith({ id: '1' })
    })

    it("should call the postMdFileInteractor's get method with the uri from the PostMetadata object", async () => {
      const _ = await postConstructor.getProcessedPost({ id: '1' })
      expect(postMdFileInteractor.get).toHaveBeenCalledWith({
        uri: dummyPostMetadata.markdownFileURI
      })
    })

    it("should call the mdFileParser's convertToHTML method with mdFile", async () => {
      const _ = await postConstructor.getProcessedPost({ id: '1' })
      expect(mdFileParser.convertToHTML).toHaveBeenCalledWith(dummyPostMdFile.markdownFile)
    })

    it('should construct a ProcessedPost object', async () => {
      const processedPost = await postConstructor.getProcessedPost({ id: '1' })
      const post = { ...dummyPostMetadata, ...dummyPostMdFile }
      const { markdownFile, ...rest } = post
      const expectedProcessedPost: ProcessedPost = {
        ...rest,
        processedMarkdownHTML: '<h1>test</h1>'
      }
      expect(processedPost).toStrictEqual(expectedProcessedPost)
    })

    it('should return undefined if any record is not found', async () => {
      const post = await postConstructor.getProcessedPost({ id: '-9999' })
      expect(post).toBe(undefined)
    })
  })
})
