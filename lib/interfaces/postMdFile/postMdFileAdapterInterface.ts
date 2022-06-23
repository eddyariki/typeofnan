import { PostMdFile } from '../post/post'

export interface PostMdFileAdapterInterface {
  get: ({ uri }: { uri: string }) => Promise<PostMdFile | undefined>
}
