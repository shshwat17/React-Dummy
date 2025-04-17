import { useEffect, useRef } from "react";

export const useIndexedDB = (dbName = "MyAppDB", version = 1, stores = []) => {
  const dbRef = useRef(null);

  // Create/open the IndexedDB on component mount
  useEffect(() => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      stores.forEach(({ name, keyPath, indexes = [] }) => {
        if (!db.objectStoreNames.contains(name)) {
          const objectStore = db.createObjectStore(name, { keyPath });

          // Add indexes to object store
          indexes.forEach(({ name, keyPath, options }) => {
            objectStore.createIndex(name, keyPath, options);
          });
        }
      });
    };

    request.onsuccess = (event) => {
      dbRef.current = event.target.result;
    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
    };
  }, [dbName, version, stores]);

  const withStore = (storeName, mode, callback) => {
    return new Promise((resolve, reject) => {
      const db = dbRef.current;
      if (!db) return reject("DB not initialized");
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      const result = callback(store);

      result.onsuccess = () => resolve(result.result);
      result.onerror = () => reject(result.error);
    });
  };

  // CRUD operations
  const add = (storeName, data) =>
    withStore(storeName, "readwrite", (store) => store.add(data));
  const put = (storeName, data) =>
    withStore(storeName, "readwrite", (store) => store.put(data));
  const remove = (storeName, key) =>
    withStore(storeName, "readwrite", (store) => store.delete(key));
  const get = (storeName, key) =>
    withStore(storeName, "readonly", (store) => store.get(key));
  const getAll = (storeName) =>
    withStore(storeName, "readonly", (store) => store.getAll());

  // Query by index
  const getByIndex = (storeName, indexName, queryValue) =>
    withStore(storeName, "readonly", (store) =>
      store.index(indexName).get(queryValue)
    );

  return { add, put, remove, get, getAll, getByIndex };
};
