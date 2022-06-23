import { PostMdFileInteractor } from '../../../../lib/interactors/post/postMdFileInteractor'
import { PostMdFileAdapterInterface } from '../../../../lib/interfaces/postMdFile/postMdFileAdapterInterface'
import { PostMdFileInteractorInterface } from '../../../../lib/interfaces/postMdFile/postMdFileInteractorInterface'
import { PostMdFile } from '../../../../lib/interfaces/post/post'

export {}

class MockMdFileAdapter implements PostMdFileAdapterInterface {
  constructor() {}

  get = async ({ uri }: { uri: string }) => {
    if (uri === '-9999') return undefined
    const postMdFile = {
      markdownFile: new Blob()
    }
    return postMdFile
  }
}

describe('PostMdFileInteractor', () => {
  let postMdFileInteractor: PostMdFileInteractorInterface
  let postMdFileAdapter: PostMdFileAdapterInterface

  beforeEach(() => {
    postMdFileAdapter = new MockMdFileAdapter()
    postMdFileInteractor = new PostMdFileInteractor(postMdFileAdapter)

    jest.spyOn(postMdFileAdapter, 'get')
  })

  describe('get', () => {
    it("should call the adapter's get() method", async () => {
      const _ = await postMdFileInteractor.get({ uri: '0' })
      expect(postMdFileAdapter.get).toHaveBeenCalled()
    })

    it('should return a PostMdFile object when a record is found', async () => {
      const postMdFile = await postMdFileInteractor.get({ uri: '0' })
      expect(postMdFile).toMatchObject<PostMdFile>({} as PostMdFile)
    })

    it('should return undefined when no record is found', async () => {
      const postMdFile = await postMdFileInteractor.get({ uri: '-9999' })
      expect(postMdFile).toBe(undefined)
    })
  })
})
