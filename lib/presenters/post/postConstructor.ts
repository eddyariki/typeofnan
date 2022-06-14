import { PostConstructorInterface } from "../../interfaces/post/postConstructorInterface";
import { PostMdFileInteractorInterface } from "../../interfaces/postMdFile/postMdFileInteractorInterface";
import { PostMetadataInteractorInterface } from "../../interfaces/postMetadata/postMetadataInteractorInterface";
import { Post } from "../../post/post";

export class PostConstructor implements PostConstructorInterface {
  constructor(
    private postMetadataInteractor: PostMetadataInteractorInterface,
    private postMdFileInteractor: PostMdFileInteractorInterface
  ) {}

  get = async ({ id }: { id: string }): Promise<Post | undefined> => {
    const postMetadata = await this.postMetadataInteractor.get({ id });
    if (!postMetadata) return undefined;

    const postMdFile = await this.postMdFileInteractor.get({
      uri: postMetadata?.markdownFileURI,
    });
    if (!postMdFile) return undefined;

    const post: Post = {
      ...postMetadata,
      ...postMdFile,
    };
    return post;
  };
}
