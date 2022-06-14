import { PostMdFile } from "../../post/post";

export interface PostMdFileInteractorInterface {
  get: ({ uri }: { uri: string }) => Promise<PostMdFile | undefined>;
}
