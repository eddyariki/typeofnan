/* eslint-disable react-hooks/rules-of-hooks */
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FirestorePostMetadataAdapter } from "../../lib/adapters/firebase/firestorePostMetadataAdapter";
import { StoragePostMdFileAdapter } from "../../lib/adapters/firebase/storagePostMdFileAdapter";
import { COLLECTION_NAME } from "../../lib/config/globals";
import { firebaseApp } from "../../lib/converters/firebase/firebaseInit";
import { FirestoreConverter } from "../../lib/converters/firebase/firestoreConverter";
import { StorageConverter } from "../../lib/converters/firebase/storageConverter";
import { PostMdFileInteractor } from "../../lib/interactors/post/postMdFileInteractor";
import { PostMetadataInteractor } from "../../lib/interactors/post/postMetadataInteractor";
import { PostConstructor } from "../../lib/presenters/post/postConstructor";

const BlogPost = ({ tester }: { tester: string }) => {
  return <></>;
};

export default BlogPost;
interface StaticProps {
  params: {
    id: string;
  };
}
export const getStaticProps = async ({ params }: StaticProps) => {
  const { id } = params;
  const db = getFirestore(firebaseApp);
  const firestoreConverter = new FirestoreConverter(db);
  const firestorePostMetadataAdapter = new FirestorePostMetadataAdapter(
    firestoreConverter,
    COLLECTION_NAME
  );
  const postMetadataInteractor = new PostMetadataInteractor(
    firestorePostMetadataAdapter
  );
  const storage = getStorage(firebaseApp);
  const storageConverter = new StorageConverter(storage);
  const storageAdapter = new StoragePostMdFileAdapter(storageConverter);
  const postMdfileInteractor = new PostMdFileInteractor(storageAdapter);

  const postConstructor = new PostConstructor(
    postMetadataInteractor,
    postMdfileInteractor
  );

  const post = await postConstructor.get({ id });
  return {
    props: { post },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: "" } }],
    fallback: true,
  };
};
