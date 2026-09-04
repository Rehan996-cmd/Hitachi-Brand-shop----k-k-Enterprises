const storage = new Map<string, string>();

const NativeLocalStorage = {
  getItem(key: string): string | null {
    return storage.has(key) ? storage.get(key)! : null;
  },

  setItem(value: string, key: string): void {
    storage.set(key, value);
  },

  removeItem(key: string): void {
    storage.delete(key);
  },

  clear(): void {
    storage.clear();
  },
};

export default NativeLocalStorage;
