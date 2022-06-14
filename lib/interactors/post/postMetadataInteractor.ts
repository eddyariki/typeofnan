import { PostMetadataAdapterInterface } from "../../interfaces/postMetadata/postMetadataAdapterInterface";
import { PostMetadataInteractorInterface } from "../../interfaces/postMetadata/postMetadataInteractorInterface";

export class PostMetadataInteractor implements PostMetadataInteractorInterface {
  constructor(private adapter: PostMetadataAdapterInterface) {}

  get = async ({ id }: { id: string }) => {
    return await this.adapter.get({ id });
  };

  getAll = async () => {
    return await this.adapter.getAll();
  };
}
