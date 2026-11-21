import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { BIBLE_BOOKS, type BibleBook } from '../data/bibleBooks';

export interface BibleVersion {
  id: 'kjv' | 'bsb' | 'web' | 'asv' | 'bbe';
  code: string;
  name: string;
  year: string;
  tag: string;
  desc: string;
  size: string;
}

export const BIBLE_VERSIONS: BibleVersion[] = [
  {
    id: 'kjv',
    code: 'KJV',
    name: 'King James Version',
    year: '1769',
    tag: 'Classic • Majestic • Revered',
    desc: 'The historic and beloved English translation with poetic cadence and traditional reverent style.',
    size: '4.2 MB',
  },
  {
    id: 'bsb',
    code: 'BSB',
    name: 'Berean Standard Bible',
    year: '2023',
    tag: 'Modern • Accurate • Fluid',
    desc: 'Faithful Greek & Hebrew study Bible in clear contemporary English.',
    size: '3.9 MB',
  },
  {
    id: 'web',
    code: 'WEB',
    name: 'World English Bible',
    year: '2000',
    tag: 'Contemporary • Public Domain',
    desc: 'Modern English revision of the American Standard Version, completely free and clear.',
    size: '4.2 MB',
  },
  {
    id: 'asv',
    code: 'ASV',
    name: 'American Standard Version',
    year: '1901',
    tag: 'Literal • Scholarly • Precise',
    desc: 'Highly esteemed for strict word-for-word fidelity to original manuscripts.',
    size: '4.2 MB',
  },
  {
    id: 'bbe',
    code: 'BBE',
    name: 'Bible in Basic English',
    year: '1949',
    tag: 'Simplified • Clear • Accessible',
    desc: 'Written using an 850-word vocabulary, great for simple reading, new believers & ESL.',
    size: '4.2 MB',
  },
];

export interface BibleSearchResult {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBookmarkItem {
  key: string; // `${book}_${chapter}_${verse}`
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version: string;
  savedAt: number;
}

interface TBCBibleDB extends DBSchema {
  bible_chapters: {
    key: string; // `${version}_${cleanBook}_${chapter}`
    value: {
      key: string;
      version: string;
      book: string;
      chapter: number;
      verses: string[];
    };
    indexes: {
      'by-version': string;
    };
  };
  bible_meta: {
    key: string; // `manifest_${version}`
    value: {
      key: string;
      version: string;
      downloaded: boolean;
      downloadedAt: number;
      chapterCount: number;
    };
  };
  bible_bookmarks: {
    key: string;
    value: BibleBookmarkItem;
  };
}

const DB_NAME = 'tbc_bible_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<TBCBibleDB>> | null = null;

function getBibleDB(): Promise<IDBPDatabase<TBCBibleDB>> {
  if (!dbPromise) {
    dbPromise = openDB<TBCBibleDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('bible_chapters')) {
          const chStore = db.createObjectStore('bible_chapters', { keyPath: 'key' });
          chStore.createIndex('by-version', 'version');
        }
        if (!db.objectStoreNames.contains('bible_meta')) {
          db.createObjectStore('bible_meta', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('bible_bookmarks')) {
          db.createObjectStore('bible_bookmarks', { keyPath: 'key' });
        }
      },
    });
  }
  return dbPromise;
}

// In-memory version file cache for ultra-fast reading
const versionFileCache = new Map<string, Array<{ name: string; abbrev: string; chapters: string[][] }>>();
const chapterMemoryCache = new Map<string, string[]>();

const BOOK_ALIASES: Record<string, string> = {
  'psalms': 'Psalm',
  'psalm': 'Psalm',
  'ps': 'Psalm',
  'song of songs': 'Song of Solomon',
  'canticles': 'Song of Solomon',
  'song': 'Song of Solomon',
  '1 cor': '1 Corinthians',
  '2 cor': '2 Corinthians',
  '1 thess': '1 Thessalonians',
  '2 thess': '2 Thessalonians',
  '1 tim': '1 Timothy',
  '2 tim': '2 Timothy',
  '1 pet': '1 Peter',
  '2 pet': '2 Peter',
  '1 jn': '1 John',
  '2 jn': '2 John',
  '3 jn': '3 John',
  'rev': 'Revelation',
  'revelations': 'Revelation',
  'matt': 'Matthew',
  'mat': 'Matthew',
  'mrk': 'Mark',
  'mk': 'Mark',
  'luk': 'Luke',
  'lk': 'Luke',
  'jn': 'John',
  'joh': 'John',
  'act': 'Acts',
  'acts': 'Acts',
  'rom': 'Romans',
  'eph': 'Ephesians',
  'phil': 'Philippians',
  'php': 'Philippians',
  'col': 'Colossians',
  'gal': 'Galatians',
  'heb': 'Hebrews',
  'jas': 'James',
  'jam': 'James',
  'prov': 'Proverbs',
  'prv': 'Proverbs',
  'isa': 'Isaiah',
  'jer': 'Jeremiah',
  'lam': 'Lamentations',
  'ezek': 'Ezekiel',
  'eze': 'Ezekiel',
  'dan': 'Daniel',
  'hos': 'Hosea',
  'joe': 'Joel',
  'amo': 'Amos',
  'obd': 'Obadiah',
  'ob': 'Obadiah',
  'jon': 'Jonah',
  'mic': 'Micah',
  'nah': 'Nahum',
  'hab': 'Habakkuk',
  'zep': 'Zephaniah',
  'zeph': 'Zephaniah',
  'hag': 'Haggai',
  'zec': 'Zechariah',
  'zech': 'Zechariah',
  'mal': 'Malachi',
  'gen': 'Genesis',
  'ex': 'Exodus',
  'exod': 'Exodus',
  'lev': 'Leviticus',
  'num': 'Numbers',
  'deu': 'Deuteronomy',
  'deut': 'Deuteronomy',
  'jos': 'Joshua',
  'josh': 'Joshua',
  'jdg': 'Judges',
  'judg': 'Judges',
  'rth': 'Ruth',
  '1sa': '1 Samuel',
  '2sa': '2 Samuel',
  '1ki': '1 Kings',
  '2ki': '2 Kings',
  '1ch': '1 Chronicles',
  '2ch': '2 Chronicles',
  'ezr': 'Ezra',
  'neh': 'Nehemiah',
  'est': 'Esther',
  'job': 'Job',
  'ecc': 'Ecclesiastes',
  'sos': 'Song of Solomon',
  '1co': '1 Corinthians',
  '2co': '2 Corinthians',
  '1th': '1 Thessalonians',
  '2th': '2 Thessalonians',
  '1ti': '1 Timothy',
  '2ti': '2 Timothy',
  'tit': 'Titus',
  'phm': 'Philemon',
  'philem': 'Philemon',
  '1pe': '1 Peter',
  '2pe': '2 Peter',
  '1jn': '1 John',
  '2jn': '2 John',
  '3jn': '3 John',
  'jud': 'Jude',
};

export function resolveBook(input: string): BibleBook | null {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().toLowerCase();

  // 1. Exact name match first (e.g. "John", "Jonah", "Romans")
  const exact = BIBLE_BOOKS.find((b) => b.name.toLowerCase() === clean);
  if (exact) return exact;

  // 2. Direct nav abbreviation match (GEN, EX, LEV, ROM, PSA, JN, JON, etc.)
  const byNav = BIBLE_BOOKS.find((b) => b.navAbbrev.toLowerCase() === clean);
  if (byNav) return byNav;

  // 3. Aliases
  if (BOOK_ALIASES[clean]) {
    const aliasMatch = BIBLE_BOOKS.find((b) => b.name.toLowerCase() === BOOK_ALIASES[clean].toLowerCase());
    if (aliasMatch) return aliasMatch;
  }

  // 4. Prefix match
  const partial = BIBLE_BOOKS.find((b) => b.name.toLowerCase().startsWith(clean));
  if (partial) return partial;

  return null;
}

export interface ParsedReference {
  valid: boolean;
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
  error?: string;
}

export function parseReference(ref: string): ParsedReference | null {
  if (!ref || typeof ref !== 'string') return null;
  const clean = ref.trim().replace(/[\u2013\u2014]/g, '-').replace(/\s+/g, ' ');

  // Matches: "Romans 12:1", "John 3:16-17", "Psalm 23", "1CO 13:4"
  const match = clean.match(/^((?:\d\s*)?[A-Za-z\s]+?)(?:\s+(\d+)(?::(\d+)(?:-(\d+))?)?)?$/);
  if (!match) return null;

  const bookNameInput = match[1] ? match[1].trim() : '';
  const book = resolveBook(bookNameInput);
  if (!book) return null;

  const chapterNum = match[2] ? parseInt(match[2], 10) : 1;
  const startVerse = match[3] ? parseInt(match[3], 10) : undefined;
  const endVerse = match[4] ? parseInt(match[4], 10) : startVerse;

  if (chapterNum < 1 || chapterNum > book.chapters) {
    return {
      valid: false,
      book: book.name,
      chapter: Math.min(Math.max(1, chapterNum), book.chapters),
      error: `${book.name} only has ${book.chapters} chapter${book.chapters > 1 ? 's' : ''}.`,
    };
  }

  return {
    valid: true,
    book: book.name,
    chapter: chapterNum,
    verse: startVerse,
    endVerse: endVerse,
  };
}

function getCandidateBibleUrls(versionId: string): string[] {
  const urls: string[] = [];

  // 1. Vite configured base URL (handles relative or custom base path)
  const baseUrl = import.meta.env.BASE_URL;
  if (baseUrl) {
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    urls.push(`${cleanBase}bible/${versionId}.json`);
  }

  // 2. Window location origin + pathname directory (GitHub Pages subpaths)
  if (typeof window !== 'undefined' && window.location) {
    const pathname = window.location.pathname;
    const dir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    const cleanDir = dir.startsWith('/') ? dir : `/${dir}`;
    urls.push(`${window.location.origin}${cleanDir}bible/${versionId}.json`);

    if (!pathname.endsWith('/')) {
      urls.push(`${window.location.origin}${pathname}/bible/${versionId}.json`);
    }
  }

  // 3. Document baseURI (if specified via <base> tag or document location)
  if (typeof document !== 'undefined' && document.baseURI) {
    try {
      const resolved = new URL(`bible/${versionId}.json`, document.baseURI).href;
      urls.push(resolved);
    } catch {
      // ignore
    }
  }

  // 4. Relative paths
  urls.push(`./bible/${versionId}.json`);
  urls.push(`bible/${versionId}.json`);

  // 5. Host root path (works on localhost / Capacitor Android root)
  urls.push(`/bible/${versionId}.json`);

  return Array.from(new Set(urls));
}

async function loadVersionRawJson(versionId: string): Promise<Array<{ name: string; abbrev: string; chapters: string[][] }> | null> {
  if (versionFileCache.has(versionId)) {
    return versionFileCache.get(versionId)!;
  }

  const urls = getCandidateBibleUrls(versionId);

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';
      // If a web server serves 404 HTML fallback (SPA rewrite) with 200, skip it
      if (contentType.includes('text/html')) {
        continue;
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        versionFileCache.set(versionId, data);
        return data;
      }
    } catch {
      // Continue to next candidate
    }
  }

  console.warn(`[BibleService] Error loading bible/${versionId}.json from candidates:`, urls);
  return null;
}

export async function isVersionDownloaded(versionId: string): Promise<boolean> {
  try {
    const db = await getBibleDB();
    const meta = await db.get('bible_meta', `manifest_${versionId}`);
    return !!meta?.downloaded;
  } catch {
    return false;
  }
}

export async function getDownloadedVersions(): Promise<string[]> {
  try {
    const db = await getBibleDB();
    const allMeta = await db.getAll('bible_meta');
    return allMeta.filter((m) => m.downloaded).map((m) => m.version);
  } catch {
    return [];
  }
}

export async function downloadTranslation(
  versionId: string,
  onProgress?: (pct: number) => void
): Promise<boolean> {
  try {
    onProgress?.(5);
    const rawData = await loadVersionRawJson(versionId);
    if (!rawData) {
      console.error(`[BibleService] Download failed: could not load raw JSON for ${versionId}`);
      return false;
    }

    onProgress?.(25);
    const db = await getBibleDB();
    const tx = db.transaction('bible_chapters', 'readwrite');
    const store = tx.objectStore('bible_chapters');

    let totalChapters = 0;
    for (const b of rawData) {
      totalChapters += b.chapters.length;
    }

    let processed = 0;
    const batchSize = 100;
    let currentBatch: Promise<unknown>[] = [];

    for (const b of rawData) {
      const bookObj = resolveBook(b.name) || resolveBook(b.abbrev);
      const bookName = bookObj ? bookObj.name : b.name;
      const cleanBook = bookName.replace(/\s+/g, '_');

      for (let chIdx = 0; chIdx < b.chapters.length; chIdx++) {
        const chapterNum = chIdx + 1;
        const verses = b.chapters[chIdx];
        const key = `${versionId}_${cleanBook}_${chapterNum}`;

        currentBatch.push(
          store.put({
            key,
            version: versionId,
            book: bookName,
            chapter: chapterNum,
            verses,
          })
        );

        processed++;

        if (currentBatch.length >= batchSize) {
          await Promise.all(currentBatch);
          currentBatch = [];
          if (onProgress) {
            const pct = Math.min(95, 25 + Math.floor((processed / totalChapters) * 70));
            onProgress(pct);
          }
        }
      }
    }

    if (currentBatch.length > 0) {
      await Promise.all(currentBatch);
    }

    await tx.done;

    // Save manifest record
    await db.put('bible_meta', {
      key: `manifest_${versionId}`,
      version: versionId,
      downloaded: true,
      downloadedAt: Date.now(),
      chapterCount: processed,
    });

    onProgress?.(100);
    return true;
  } catch (err) {
    console.error(`[BibleService] Download error for ${versionId}:`, err);
    return false;
  }
}

export async function deleteTranslation(versionId: string): Promise<boolean> {
  try {
    const db = await getBibleDB();
    // Delete all chapters for this version
    const tx = db.transaction(['bible_chapters', 'bible_meta'], 'readwrite');
    const chStore = tx.objectStore('bible_chapters');
    const metaStore = tx.objectStore('bible_meta');

    const index = chStore.index('by-version');
    let cursor = await index.openCursor(versionId);
    while (cursor) {
      await cursor.delete();
      cursor = await cursor.continue();
    }

    await metaStore.delete(`manifest_${versionId}`);
    await tx.done;

    // Evict from caches
    for (const key of Array.from(chapterMemoryCache.keys())) {
      if (key.startsWith(`${versionId}_`)) {
        chapterMemoryCache.delete(key);
      }
    }

    return true;
  } catch (err) {
    console.error(`[BibleService] Delete error for ${versionId}:`, err);
    return false;
  }
}

export async function getChapterVerses(
  versionId: string,
  bookName: string,
  chapterNum: number
): Promise<string[] | null> {
  const cleanBook = bookName.replace(/\s+/g, '_');
  const cacheKey = `${versionId}_${cleanBook}_${chapterNum}`;

  if (chapterMemoryCache.has(cacheKey)) {
    return chapterMemoryCache.get(cacheKey)!;
  }

  // 1. Try IndexedDB
  try {
    const db = await getBibleDB();
    const record = await db.get('bible_chapters', cacheKey);
    if (record?.verses && record.verses.length > 0) {
      chapterMemoryCache.set(cacheKey, record.verses);
      return record.verses;
    }
  } catch (err) {
    console.warn('[BibleService] IndexedDB read fallback:', err);
  }

  // 2. Fallback to raw local JSON file (instant response, works offline)
  try {
    const rawData = await loadVersionRawJson(versionId);
    if (rawData) {
      const bookObj = resolveBook(bookName);
      let found: { name: string; abbrev: string; chapters: string[][] } | undefined;

      if (
        bookObj &&
        rawData[bookObj.index] &&
        rawData[bookObj.index].name.toLowerCase() === bookObj.name.toLowerCase()
      ) {
        found = rawData[bookObj.index];
      } else {
        const targetName = bookObj ? bookObj.name.toLowerCase() : bookName.toLowerCase();
        found = rawData.find((b) => b.name.toLowerCase() === targetName);
        if (!found) {
          const targetAbbrev = bookObj ? bookObj.abbrev.toLowerCase() : '';
          found = rawData.find((b) => b.abbrev.toLowerCase() === targetAbbrev);
        }
      }

      if (found && found.chapters[chapterNum - 1]) {
        const verses = found.chapters[chapterNum - 1];
        chapterMemoryCache.set(cacheKey, verses);
        return verses;
      }
    }
  } catch (err) {
    console.warn(`[BibleService] Raw JSON fallback error:`, err);
  }

  return null;
}

export async function searchScripture(
  versionId: string,
  query: string,
  scope: 'all' | 'ot' | 'nt' = 'all'
): Promise<BibleSearchResult[]> {
  const cleanQuery = (query || '').trim().toLowerCase();
  if (cleanQuery.length < 2) return [];

  const rawData = await loadVersionRawJson(versionId);
  if (!rawData) return [];

  const results: BibleSearchResult[] = [];
  const maxResults = 100;

  for (const b of rawData) {
    const bookObj = resolveBook(b.name) || resolveBook(b.abbrev);
    const bookName = bookObj ? bookObj.name : b.name;
    const testament = bookObj ? bookObj.testament : 'OT';

    if (scope === 'ot' && testament !== 'OT') continue;
    if (scope === 'nt' && testament !== 'NT') continue;

    for (let chIdx = 0; chIdx < b.chapters.length; chIdx++) {
      const chapterNum = chIdx + 1;
      const verses = b.chapters[chIdx];
      for (let vIdx = 0; vIdx < verses.length; vIdx++) {
        const verseNum = vIdx + 1;
        const text = verses[vIdx];
        if (text && text.toLowerCase().includes(cleanQuery)) {
          results.push({
            book: bookName,
            chapter: chapterNum,
            verse: verseNum,
            text,
          });
          if (results.length >= maxResults) return results;
        }
      }
    }
  }

  return results;
}

export async function saveBibleBookmark(item: Omit<BibleBookmarkItem, 'savedAt' | 'key'>): Promise<void> {
  const db = await getBibleDB();
  const key = `${item.book}_${item.chapter}_${item.verse}`;
  await db.put('bible_bookmarks', {
    ...item,
    key,
    savedAt: Date.now(),
  });
}

export async function removeBibleBookmark(book: string, chapter: number, verse: number): Promise<void> {
  const db = await getBibleDB();
  const key = `${book}_${chapter}_${verse}`;
  await db.delete('bible_bookmarks', key);
}

export async function getBibleBookmarks(): Promise<BibleBookmarkItem[]> {
  try {
    const db = await getBibleDB();
    return await db.getAll('bible_bookmarks');
  } catch {
    return [];
  }
}

export async function isVerseBookmarked(book: string, chapter: number, verse: number): Promise<boolean> {
  try {
    const db = await getBibleDB();
    const key = `${book}_${chapter}_${verse}`;
    const found = await db.get('bible_bookmarks', key);
    return !!found;
  } catch {
    return false;
  }
}
