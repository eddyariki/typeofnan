import { FirestoreConverterInterface } from '../../interfaces/firebase/firestoreConverterInterface'
import { collection, doc, Firestore, getDoc, getDocs } from 'firebase/firestore'

export class FirestoreConverter implements FirestoreConverterInterface {
  constructor(private db: Firestore, private collectionName: string) {}

  get = async ({ id }: { id: string }) => {
    const docRef = doc(this.db, this.collectionName, id)
    const docSnap = await getDoc(docRef)

    return docSnap.data()
  }

  getAll = async () => {
    const querySnapshot = await getDocs(collection(this.db, this.collectionName))
    return querySnapshot.docs
  }
}
