import { ProcessedPost } from '../../../lib/interfaces/post/post'
import styles from './titleBlock.module.scss'

type LayoutProps = Required<{
  readonly processedPost: ProcessedPost
  readonly readTime: string
  readonly createdAtDatetimeString: string
}>

const TitleBlock = ({ processedPost, readTime, createdAtDatetimeString }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{processedPost?.title}</h1>

      <p className={styles.details}>
        {createdAtDatetimeString} / {readTime}min read
      </p>
    </div>
  )
}

export default TitleBlock
