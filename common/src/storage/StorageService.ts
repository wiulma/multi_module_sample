type StorageServiceType = {
  storage: Map<string, unknown>;
  setItem: (key: string, value: unknown) => void;
  getItem: (key: string) => unknown;
  clear: (key: string) => void;
};
export const StorageService: StorageServiceType = {
  storage: new Map(),
  setItem(key, value) {
    this.storage.set(key, value);
  },
  getItem(key: string) {
    return this.storage.get(key);
  },
  clear(key: string) {
    this.storage.delete(key);
  },
};
