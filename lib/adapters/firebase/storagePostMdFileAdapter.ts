import { StorageConverterInterface } from "../../interfaces/firebase/storageConverterInterface";
import { PostMdFileAdapterInterface } from "../../interfaces/postMdFile/postMdFileAdapterInterface";
import { PostMdFile } from "../../post/post";

export class StoragePostMdFileAdapter implements PostMdFileAdapterInterface {
  constructor(private converter: StorageConverterInterface) {}

  get = async ({ uri }: { uri: string }) => {
    const blob = await this.converter.get({ uri });
    if (!blob) return undefined;
    return {
      markdownFile: blob,
    };
  };
}
