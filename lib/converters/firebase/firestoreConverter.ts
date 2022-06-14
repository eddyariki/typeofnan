import { FirestoreConverterInterface } from "../../interfaces/firebase/firestoreConverterInterface";
import { doc, Firestore, getDoc } from "firebase/firestore";

export class FirestoreConverter implements FirestoreConverterInterface {
  constructor(private db: Firestore) {}

  get = async ({ collection, id }: { collection: string; id: string }) => {
    const docRef = doc(this.db, collection, id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  };
}
