import React, { createContext, useContext, useEffect } from "react";
import { useIndexedDB } from "../CustomHook/useIndexedDB"; // Import your custom hook

const IndexedDBContext = createContext();

export const IndexedDBProvider = ({ children }) => {
  const storeConfig = [
    {
      name: "users",
      keyPath: "id",
      indexes: [{ name: "email", keyPath: "email", options: { unique: true } }], // Unique index
    },
    {
      name: "products",
      keyPath: "id",
      indexes: [{ name: "title", keyPath: "title" }],
    },
  ];

  const db = useIndexedDB("MyAppDB", 1, storeConfig);

  // Sync from API to IndexedDB (Download)
  //   const downloadFromAPI = async (storeName, endpoint) => {
  //     const res = await fetch(endpoint);
  //     const data = await res.json();

  //     for (const item of data) {
  //       await db.put(storeName, item); // Insert into IndexedDB
  //     }

  //     console.log(`[SYNCED] ${data.length} records → ${storeName}`);
  //   };

  // Sync from IndexedDB to API (Upload)
  //   const uploadToAPI = async (storeName, endpoint) => {
  //     const data = await db.getAll(storeName);

  //     await fetch(endpoint, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     console.log(`[UPLOADED] ${data.length} records from ${storeName}`);
  //   };

  // Auto-sync when coming back online
  //   useEffect(() => {
  //     const handleOnline = () => {
  //       uploadToAPI("users", "/api/sync/users");
  //       uploadToAPI("products", "/api/sync/products");
  //     };

  //     window.addEventListener("online", handleOnline);
  //     return () => window.removeEventListener("online", handleOnline);
  //   }, [db]);

  return (
    <IndexedDBContext.Provider value={db}>{children}</IndexedDBContext.Provider>
  );
};

export const useDB = () => useContext(IndexedDBContext);
