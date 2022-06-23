import { PostMetadataInteractor } from '../../../../lib/interactors/post/postMetadataInteractor'
import { PostMetadataAdapterInterface } from '../../../../lib/interfaces/postMetadata/postMetadataAdapterInterface'
import { PostMetadataInteractorInterface } from '../../../../lib/interfaces/postMetadata/postMetadataInteractorInterface'
import { PostMetadata } from '../../../../lib/interfaces/post/post'

class MockPostMetadataAdapter implements PostMetadataAdapterInterface {
  constructor() {}

  get = async ({ id }: { id: string }) => {
    if (id === '1') return {} as PostMetadata
    return undefined
  }

  getAll = async () => {
    return [{} as PostMetadata]
  }
}

describe('PostMetadataInteractor', () => {
  let postMetadataInteractor: PostMetadataInteractorInterface
  let postMetadataAdapter: PostMetadataAdapterInterface

  beforeEach(() => {
    postMetadataAdapter = new MockPostMetadataAdapter()
    postMetadataInteractor = new PostMetadataInteractor(postMetadataAdapter)

    jest.spyOn(postMetadataAdapter, 'get')

    jest.spyOn(postMetadataAdapter, 'getAll')
  })

  describe('get', () => {
    it("should call the adapter's get() method", async () => {
      const _ = await postMetadataInteractor.get({ id: '1' })

      expect(postMetadataAdapter.get).toHaveBeenCalled()
    })

    it('should return PostMetadata object when a record is found', async () => {
      const postMetadata = await postMetadataAdapter.get({ id: '1' })

      expect(postMetadata).toMatchObject<PostMetadata>({} as PostMetadata)
    })

    it('should return undefined when no record is found', async () => {
      const postMetadata = await postMetadataAdapter.get({ id: '-9999' })

      expect(postMetadata).toBe(undefined)
    })
  })

  describe('getAll', () => {
    it("should call the adapter's getAll() method", async () => {
      const _ = await postMetadataInteractor.getAll()

      expect(postMetadataAdapter.getAll).toHaveBeenCalled()
    })

    it('should return PostsMetadata object array', async () => {
      const postsMetadata = await postMetadataAdapter.getAll()

      expect(postsMetadata).toMatchObject<PostMetadata[]>([{} as PostMetadata])
    })

    it('should return an empty array when no record is found', async () => {
      jest.spyOn(postMetadataAdapter, 'getAll').mockImplementationOnce(async () => {
        return []
      })
      const postsMetadata = await postMetadataAdapter.getAll()

      expect(postsMetadata).toStrictEqual([])
    })
  })
})
