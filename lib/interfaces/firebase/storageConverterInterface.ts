export interface StorageConverterInterface {
  get: ({ uri }: { uri: string }) => Promise<Blob | undefined>;
}
