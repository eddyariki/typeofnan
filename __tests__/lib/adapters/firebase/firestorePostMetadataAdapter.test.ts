import { DocumentData, Timestamp } from "firebase/firestore";
import { FirestorePostMetadataAdapter } from "../../../../lib/adapters/firebase/firestorePostMetadataAdapter";
import { FirestoreConverterInterface } from "../../../../lib/interfaces/firebase/firestoreConverterInterface";
import { PostMetadataAdapterInterface } from "../../../../lib/interfaces/postMetadata/postMetadataAdapterInterface";
import {
  FirestoreConverterPostMetadata,
  PostMetadata,
} from "../../../../lib/post/post";

export {};
class MockTimeStamp {
  constructor(readonly seconds: number) {}
}
const firestoreConverterPostMetadataFixture: FirestoreConverterPostMetadata = {
  isPublished: true,
  markdownFileURI: "",
  createdAt: new MockTimeStamp(1212) as Timestamp,
  author: "James",
  tags: ["react", "nextjs"],
  title: "test",
  id: "rrrrrrrrrrrrr",
  version: 1,
};
const postMetadataFixture: PostMetadata = {
  ...firestoreConverterPostMetadataFixture,
  createdAt: 1212,
};
class MockFirestoreConverter implements FirestoreConverterInterface {
  constructor() {}

  get = async ({
    collection,
    id,
  }: {
    collection: string;
    id: string;
  }): Promise<DocumentData | undefined> => {
    if (id === "rrrrrrrrrrrrr") return firestoreConverterPostMetadataFixture;
    return undefined;
  };
}

describe("FirebasePostAdapter", () => {
  let firestoreConverter: FirestoreConverterInterface;
  let firestorePostMetadataAdapter: PostMetadataAdapterInterface;
  beforeEach(() => {
    firestoreConverter = new MockFirestoreConverter();
    firestorePostMetadataAdapter = new FirestorePostMetadataAdapter(
      firestoreConverter,
      "TEST COLLECTION"
    );
    jest.spyOn(firestoreConverter, "get");
  });

  describe("get", () => {
    it("should call the converter's get() method", async () => {
      const _ = await firestorePostMetadataAdapter.get({
        id: "rrrrrrrrrrrrr0",
      });
      expect(firestoreConverter.get).toHaveBeenCalledTimes(1);
    });

    it("should construct a PostMetadata Object with the data it receives from the converter", async () => {
      const postMetadata = await firestorePostMetadataAdapter.get({
        id: "rrrrrrrrrrrrr",
      });
      expect(postMetadata).toStrictEqual(postMetadataFixture);
    });

    it("should return undefined when no record is found", async () => {
      const postMetadata = await firestorePostMetadataAdapter.get({
        id: "-999",
      });
      expect(postMetadata).toBe(undefined);
    });
  });
});
