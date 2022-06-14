import { StoragePostMdFileAdapter } from "../../../../lib/adapters/firebase/storagePostMdFileAdapter";
import { StorageConverter } from "../../../../lib/converters/firebase/storageConverter";
import { StorageConverterInterface } from "../../../../lib/interfaces/firebase/storageConverterInterface";
import { PostMdFileAdapterInterface } from "../../../../lib/interfaces/postMdFile/postMdFileAdapterInterface";
import { PostMdFile } from "../../../../lib/post/post";

export {};

class MockStorageConverter {
  constructor() {}

  get = async ({ uri }: { uri: string }) => {
    if (uri === "-999") return undefined;
    return new Blob();
  };
}

describe("StoragePostMdFileAdapter", () => {
  let storagePostMdFileAdapter: PostMdFileAdapterInterface;
  let storageConverter: StorageConverterInterface;

  beforeEach(() => {
    storageConverter = new MockStorageConverter();
    storagePostMdFileAdapter = new StoragePostMdFileAdapter(storageConverter);

    jest.spyOn(storageConverter, "get");
  });

  describe("get", () => {
    it("should call the converter's get() method", async () => {
      const _ = await storagePostMdFileAdapter.get({ uri: "0" });
      expect(storageConverter.get).toHaveBeenCalledTimes(1);
    });

    it("should return a PostMdFile object when a record is found", async () => {
      const postMdFile = await storagePostMdFileAdapter.get({ uri: "0" });
      expect(postMdFile).toMatchObject<PostMdFile>({} as PostMdFile);
    });

    it("should return undefined when no record is found", async () => {
      const postMdFile = await storagePostMdFileAdapter.get({ uri: "-999" });
      expect(postMdFile);
    });
  });
});
