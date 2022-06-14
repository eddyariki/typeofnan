import { COLLECTION_NAME } from "../../config/globals";
import { FirestoreConverterInterface } from "../../interfaces/firebase/firestoreConverterInterface";
import { PostMetadataAdapterInterface } from "../../interfaces/postMetadata/postMetadataAdapterInterface";
import { FirestoreConverterPostMetadata, PostMetadata } from "../../post/post";

export class FirestorePostMetadataAdapter
  implements PostMetadataAdapterInterface
{
  constructor(
    private converter: FirestoreConverterInterface,
    private collection: string
  ) {}

  get = async ({ id }: { id: string }): Promise<PostMetadata | undefined> => {
    const data = await this.converter.get({
      collection: this.collection,
      id,
    });

    if (!data) return undefined;

    const firestoreConverterPostMetadata =
      data as FirestoreConverterPostMetadata;

    const processedData: PostMetadata = {
      ...firestoreConverterPostMetadata,
      createdAt: firestoreConverterPostMetadata.createdAt.seconds,
    };

    return processedData;
  };

  getAll = async (): Promise<PostMetadata[]> => {
    return [{} as PostMetadata];
  };
}
