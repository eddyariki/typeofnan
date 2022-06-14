import { Post } from "../../post/post";

export interface PostConstructorInterface {
  get: ({ id }: { id: string }) => Promise<Post | undefined>;
}
