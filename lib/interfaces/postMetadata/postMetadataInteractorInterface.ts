import { Post, PostMetadata } from "../../post/post";

export interface PostMetadataInteractorInterface {
  get: ({ id }: { id: string }) => Promise<PostMetadata | undefined>;
  getAll: () => Promise<PostMetadata[]>;
}
