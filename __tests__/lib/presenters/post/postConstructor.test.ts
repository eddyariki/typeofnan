import { PostMdFileInteractor } from "../../../../lib/interactors/post/postMdFileInteractor";
import { PostMetadataInteractor } from "../../../../lib/interactors/post/postMetadataInteractor";
import { PostConstructorInterface } from "../../../../lib/interfaces/post/postConstructorInterface";
import { PostMdFileAdapterInterface } from "../../../../lib/interfaces/postMdFile/postMdFileAdapterInterface";
import { PostMdFileInteractorInterface } from "../../../../lib/interfaces/postMdFile/postMdFileInteractorInterface";
import { PostMetadataAdapterInterface } from "../../../../lib/interfaces/postMetadata/postMetadataAdapterInterface";
import { PostMetadataInteractorInterface } from "../../../../lib/interfaces/postMetadata/postMetadataInteractorInterface";
import { PostMdFile, PostMetadata } from "../../../../lib/post/post";
import { PostConstructor } from "../../../../lib/presenters/post/postConstructor";

export {};

const dummyPostMetadata: PostMetadata = {
  id: "0",
  tags: ["test"],
  title: "test",
  author: "tester",
  version: 1,
  markdownFileURI: "this.location",
  createdAt: 11111111,
  isPublished: true,
};
const dummyPostMdFile: PostMdFile = {
  markdownFile: new Blob(),
};
class MockMdFileAdapter implements PostMdFileAdapterInterface {
  constructor() {}

  get = async ({ uri }: { uri: string }) => {
    if (uri === "-9999") return undefined;
    return dummyPostMdFile;
  };
}

class MockPostMetadataAdapter implements PostMetadataAdapterInterface {
  constructor() {}

  get = async ({ id }: { id: string }) => {
    if (id === "1") return dummyPostMetadata;
    return undefined;
  };

  getAll = async () => {
    return [dummyPostMetadata];
  };
}

describe("PostConstructor", () => {
  let postConstructor: PostConstructorInterface;
  let postMdFileInteractor: PostMdFileInteractorInterface;
  let postMetadataInteractor: PostMetadataInteractorInterface;
  beforeEach(() => {
    postMetadataInteractor = new PostMetadataInteractor(
      new MockPostMetadataAdapter()
    );
    postMdFileInteractor = new PostMdFileInteractor(new MockMdFileAdapter());
    postConstructor = new PostConstructor(
      postMetadataInteractor,
      postMdFileInteractor
    );

    jest.spyOn(postMetadataInteractor, "get");
    jest.spyOn(postMdFileInteractor, "get");
  });

  describe("get()", () => {
    it("should call each postMetadataInteractor's get method with id", async () => {
      const _ = await postConstructor.get({ id: "1" });
      expect(postMetadataInteractor.get).toHaveBeenCalledWith({ id: "1" });
    });

    it("should call the postMdFileInteractor's get method with the uri from the PostMetadata object", async () => {
      const _ = await postConstructor.get({ id: "1" });
      expect(postMdFileInteractor.get).toHaveBeenCalledWith({
        uri: dummyPostMetadata.markdownFileURI,
      });
    });

    it("should construct a Post object", async () => {
      const post = await postConstructor.get({ id: "1" });
      expect(post).toStrictEqual({ ...dummyPostMetadata, ...dummyPostMdFile });
    });

    it("should return undefined if any record is not found", async () => {
      const post = await postConstructor.get({ id: "-9999" });
      expect(post).toBe(undefined);
    });
  });
});
