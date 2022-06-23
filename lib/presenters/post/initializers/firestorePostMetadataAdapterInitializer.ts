import { getFirestore } from 'firebase/firestore'
import { FirestorePostMetadataAdapter } from '../../../adapters/firebase/firestorePostMetadataAdapter'
import { COLLECTION_NAME } from '../../../config/globals'
import { firebaseApp } from '../../../converters/firebase/firebaseInit'
import { FirestoreConverter } from '../../../converters/firebase/firestoreConverter'

const db = getFirestore(firebaseApp)
const firestoreConverter = new FirestoreConverter(db, COLLECTION_NAME)
const firestorePostMetadataAdapter = new FirestorePostMetadataAdapter(firestoreConverter)

export default firestorePostMetadataAdapter
