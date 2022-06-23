import { getStorage } from 'firebase/storage'
import { StoragePostMdFileAdapter } from '../../../adapters/firebase/storagePostMdFileAdapter'
import { firebaseApp } from '../../../converters/firebase/firebaseInit'
import { StorageConverter } from '../../../converters/firebase/storageConverter'

const storage = getStorage(firebaseApp)
const storageConverter = new StorageConverter(storage)
const storageAdapter = new StoragePostMdFileAdapter(storageConverter)

export default storageAdapter
