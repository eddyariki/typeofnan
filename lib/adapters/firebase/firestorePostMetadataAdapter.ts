import { FirestoreConverterInterface } from '../../interfaces/firebase/firestoreConverterInterface'
import { PostMetadataAdapterInterface } from '../../interfaces/postMetadata/postMetadataAdapterInterface'
import { FirestoreConverterPostMetadata, PostMetadata } from '../../interfaces/post/post'

export class FirestorePostMetadataAdapter implements PostMetadataAdapterInterface {
  constructor(private converter: FirestoreConverterInterface) {}

  get = async ({ id }: { id: string }): Promise<PostMetadata | undefined> => {
    const data = await this.converter.get({
      id
    })
    if (!data) return undefined

    const firestoreConverterPostMetadata = data as FirestoreConverterPostMetadata
    const processedData = this.process(firestoreConverterPostMetadata)

    return processedData
  }

  getAll = async (): Promise<PostMetadata[]> => {
    const firestoreConverterPostsMetadata = await this.converter.getAll()
    if (firestoreConverterPostsMetadata.length == 0) return []
    const postsData = firestoreConverterPostsMetadata.map((documentData) => {
      const firestoreConverterPostMetadata = documentData.data() as FirestoreConverterPostMetadata
      const processedData = this.process(firestoreConverterPostMetadata)
      return processedData
    })

    return postsData
  }

  private process = (firestoreConverterPostMetadata: FirestoreConverterPostMetadata) => {
    const processedData: PostMetadata = {
      ...firestoreConverterPostMetadata,
      createdAt: firestoreConverterPostMetadata.createdAt.seconds
    }
    return processedData
  }
}
