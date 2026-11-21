import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { DownloadedItem } from '../types/library';

interface HymnLibraryDB extends DBSchema {
  downloads: {
    key: string;
    value: DownloadedItem;
    indexes: { 'by-type': string };
  };
  unlockedBooks: {
    key: string; // book id
    value: {
      bookId: string;
      unlockedAt: number;
      licenseKey?: string;
    };
  };
  devotionCache: {
    key: string; // date YYYY-MM-DD
    value: any;
  };
}

const DB_NAME = 'churches_of_god_library_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<HymnLibraryDB>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<HymnLibraryDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('downloads')) {
          const downloadStore = db.createObjectStore('downloads', { keyPath: 'id' });
          downloadStore.createIndex('by-type', 'itemType');
        }
        if (!db.objectStoreNames.contains('unlockedBooks')) {
          db.createObjectStore('unlockedBooks', { keyPath: 'bookId' });
        }
        if (!db.objectStoreNames.contains('devotionCache')) {
          db.createObjectStore('devotionCache', { keyPath: 'date' });
        }
      },
    });
  }
  return dbPromise;
}

// Download manager operations
export async function saveDownload(item: DownloadedItem): Promise<void> {
  const db = await getDB();
  await db.put('downloads', item);
}

export async function removeDownload(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('downloads', id);
}

export async function getAllDownloads(): Promise<DownloadedItem[]> {
  const db = await getDB();
  return db.getAll('downloads');
}

export async function isItemDownloaded(id: string): Promise<boolean> {
  const db = await getDB();
  const found = await db.get('downloads', id);
  return !!found;
}

// Unlocking bookstore items
export async function unlockBookLicense(bookId: string, licenseKey?: string): Promise<void> {
  const db = await getDB();
  await db.put('unlockedBooks', {
    bookId,
    unlockedAt: Date.now(),
    licenseKey,
  });
}

export async function isBookUnlocked(bookId: string): Promise<boolean> {
  const db = await getDB();
  const rec = await db.get('unlockedBooks', bookId);
  return !!rec;
}

export async function getUnlockedBookIds(): Promise<string[]> {
  const db = await getDB();
  const all = await db.getAll('unlockedBooks');
  return all.map((item) => item.bookId);
}

// Devotions caching
export async function cacheDevotions(devotions: any[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('devotionCache', 'readwrite');
  for (const d of devotions) {
    await tx.store.put(d);
  }
  await tx.done;
}

export async function getCachedDevotion(date: string): Promise<any | undefined> {
  const db = await getDB();
  return db.get('devotionCache', date);
}
