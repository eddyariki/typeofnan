import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

export interface FirestoreConverterInterface {
  get: ({ id }: { id: string }) => Promise<DocumentData | undefined>
  getAll: () => Promise<QueryDocumentSnapshot<DocumentData>[]>
}
