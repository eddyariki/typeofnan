import { StorageConverterInterface } from "../../interfaces/firebase/storageConverterInterface";
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";

export class StorageConverter implements StorageConverterInterface {
  constructor(private storage: FirebaseStorage) {}

  get = async ({ uri }: { uri: string }) => {
    try {
      return await this.getBlob(uri);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  private getBlob = async (uri: string) => {
    const downloadURL = await getDownloadURL(
      ref(this.storage, `gs://typeofnan-f6c19.appspot.com/${uri}`)
    );
    const data = await fetch(downloadURL);
    const blob = await data.blob();
    return blob;
  };
}
