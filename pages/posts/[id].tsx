import { PostMdFileInteractor } from '../../lib/interactors/post/postMdFileInteractor'
import { PostMetadataInteractor } from '../../lib/interactors/post/postMetadataInteractor'
import { ProcessedPost } from '../../lib/interfaces/post/post'
import firestorePostMetadataAdapter from '../../lib/presenters/post/initializers/firestorePostMetadataAdapterInitializer'
import { PostConstructor } from '../../lib/presenters/post/postConstructor'
import storageAdapter from '../../lib/presenters/post/initializers/storagePostMdFileAdapterIntializer'
import styles from './post.module.scss'
import TitleBlock from './components/titleBlock'
import { calculateReadTime } from '../../lib/presenters/post/calculateReadTime'
import { convertUnixToDatetimeSting } from '../../lib/presenters/post/convertUnixToDatetimeString'
import { PostMdFileParser } from '../../lib/presenters/post/postMdFileParser'
import { UnifiedMdFileParser } from '../../lib/presenters/post/unifiedMdFileParser'

const BlogPost = ({
  processedPost,
  readTime,
  createdAtDatetimeString
}: {
  processedPost: ProcessedPost
  readTime: string
  createdAtDatetimeString: string
}) => {
  return (
    <div className={styles.container}>
      <TitleBlock
        processedPost={processedPost}
        readTime={readTime}
        createdAtDatetimeString={createdAtDatetimeString}
      />
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: processedPost?.processedMarkdownHTML }}></div>
      </div>
    </div>
  )
}

export default BlogPost
interface StaticProps {
  params: {
    id: string
  }
}
export const getStaticProps = async ({ params }: StaticProps) => {
  const { id } = params
  const postMetadataInteractor = new PostMetadataInteractor(firestorePostMetadataAdapter)
  const postMdfileInteractor = new PostMdFileInteractor(storageAdapter)
  const postMdFileParser = new PostMdFileParser(new UnifiedMdFileParser())
  const postConstructor = new PostConstructor(
    postMetadataInteractor,
    postMdfileInteractor,
    postMdFileParser
  )

  const processedPost = await postConstructor.getProcessedPost({ id })
  if (!processedPost) return { props: {} }

  const readTime = calculateReadTime(processedPost.processedMarkdownHTML)
  const createdAtDatetimeString = convertUnixToDatetimeSting(processedPost.createdAt)

  return {
    props: { processedPost, readTime, createdAtDatetimeString }
  }
}

export const getStaticPaths = async () => {
  const postMetadataInteractor = new PostMetadataInteractor(firestorePostMetadataAdapter)
  const postsMetadata = await postMetadataInteractor.getAll()
  return {
    paths: postsMetadata.map((postMetadata) => {
      return {
        params: {
          id: postMetadata.id
        }
      }
    }),
    fallback: true
  }
}
