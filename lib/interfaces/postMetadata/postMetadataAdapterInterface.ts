import { PostMetadata } from '../post/post'

export interface PostMetadataAdapterInterface {
  get: ({ id }: { id: string }) => Promise<PostMetadata | undefined>
  getAll: () => Promise<PostMetadata[]>
}
