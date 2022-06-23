import { PostConstructorInterface } from '../../interfaces/presenters/post/postConstructorInterface'
import { PostMdFileInteractorInterface } from '../../interfaces/postMdFile/postMdFileInteractorInterface'
import { PostMetadataInteractorInterface } from '../../interfaces/postMetadata/postMetadataInteractorInterface'
import { Post, ProcessedPost } from '../../interfaces/post/post'
import { PostMdFileParserInterface } from './interfaces/postMdFileParserInterface'

export class PostConstructor implements PostConstructorInterface {
  constructor(
    private postMetadataInteractor: PostMetadataInteractorInterface,
    private postMdFileInteractor: PostMdFileInteractorInterface,
    private postMdFileParser: PostMdFileParserInterface
  ) {}

  getProcessedPost = async ({ id }: { id: string }): Promise<ProcessedPost | undefined> => {
    const post = await this.getPost({ id })
    if (!post) return undefined
    const processedMarkdownHTML = await this.postMdFileParser.convertToHTML(post.markdownFile)
    return this.convertToProcessedPost(post, processedMarkdownHTML)
  }

  private getPost = async ({ id }: { id: string }): Promise<Post | undefined> => {
    const postMetadata = await this.postMetadataInteractor.get({ id })
    if (!postMetadata) return undefined

    const postMdFile = await this.postMdFileInteractor.get({
      uri: postMetadata?.markdownFileURI
    })
    if (!postMdFile) return undefined

    const post: Post = {
      ...postMetadata,
      ...postMdFile
    }
    return post
  }

  private convertToProcessedPost = (post: Post, processedMarkdownHTML: string) => {
    const { markdownFile, ...rest } = post
    const processedPost: ProcessedPost = {
      ...rest,
      processedMarkdownHTML
    }
    return processedPost
  }
}
