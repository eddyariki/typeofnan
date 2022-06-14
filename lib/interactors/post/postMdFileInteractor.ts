import { PostMdFileAdapterInterface } from "../../interfaces/postMdFile/postMdFileAdapterInterface";
import { PostMdFileInteractorInterface } from "../../interfaces/postMdFile/postMdFileInteractorInterface";

export class PostMdFileInteractor implements PostMdFileInteractorInterface {
  constructor(private adapter: PostMdFileAdapterInterface) {}

  get = async ({ uri }: { uri: string }) => {
    return await this.adapter.get({ uri });
  };
}
