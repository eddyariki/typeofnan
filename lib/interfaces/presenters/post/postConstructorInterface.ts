import { ProcessedPost } from '../../post/post'

export interface PostConstructorInterface {
  getProcessedPost: ({ id }: { id: string }) => Promise<ProcessedPost | undefined>
}
