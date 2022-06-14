import { DocumentData } from "firebase/firestore";

export interface FirestoreConverterInterface {
  get: ({
    collection,
    id,
  }: {
    collection: string;
    id: string;
  }) => Promise<DocumentData | undefined>;
}
