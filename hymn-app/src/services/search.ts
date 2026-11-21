import type { Hymn } from '../types/hymn';
import { ENCRYPTED_HYMNS_PAYLOAD } from '../data/hymnsEncoded';

function decodeHymnPayload(payload: string): Hymn[] {
  try {
    const key = [0x74, 0x62, 0x63, 0x5F, 0x73, 0x61, 0x63, 0x72, 0x65, 0x64, 0x5F, 0x68, 0x79, 0x6D, 0x6E, 0x73];
    const binStr = atob(payload);
    const bytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bytes[i] = binStr.charCodeAt(i) ^ key[i % key.length];
    }
    const decodedStr = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(decodedStr) as Hymn[];
  } catch (err) {
    console.error('Failed to load sacred hymns:', err);
    return [];
  }
}

export const allHymns: Hymn[] = decodeHymnPayload(ENCRYPTED_HYMNS_PAYLOAD);

// O(1) Fast lookup index by Hymn Number
export const hymnByNumberMap = new Map<number, Hymn>();
allHymns.forEach((h) => hymnByNumberMap.set(h.number, h));

export function getHymnByNumber(num: number): Hymn | undefined {
  return hymnByNumberMap.get(num);
}

export interface MeterAndTune {
  meter: string;
  tune?: string;
}

export function parseMeterAndTune(rawMeter: string | undefined | null): MeterAndTune {
  if (!rawMeter) return { meter: '' };
  const trimmed = rawMeter.trim();

  if (trimmed.includes(' - ')) {
    const parts = trimmed.split(' - ');
    return { meter: parts[0].trim(), tune: parts.slice(1).join(' - ').trim() };
  }

  const match = trimmed.match(
    /^((?:[0-9\.\,\s]+|[CLSD]\.?[MLH]\.?|P\.M\.|CHANT|METRICAL CHANT)(?:\s*D\.?)?)\s+([A-Z\s\(\)\,\.\'\-]+)$/i
  );
  if (match) {
    const m = match[1].trim();
    const t = match[2].trim();
    if (t.length > 1) {
      return { meter: m, tune: t };
    }
  }

  return { meter: trimmed };
}

export interface SearchMatch {
  hymn: Hymn;
  snippet?: string;
  matchedField: 'number' | 'title' | 'meter' | 'lyrics';
}

export function searchHymns(query: string): SearchMatch[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) {
    return allHymns.map((h) => ({ hymn: h, matchedField: 'number' }));
  }

  // 1. If query is numeric, prioritize number matches
  const isNumeric = /^\d+$/.test(cleanQ);
  if (isNumeric) {
    const targetNum = parseInt(cleanQ, 10);
    const results: SearchMatch[] = [];

    // Exact match
    const exact = hymnByNumberMap.get(targetNum);
    if (exact) {
      results.push({ hymn: exact, matchedField: 'number' });
    }

    // Number prefix matches (e.g., typing '2' matches 20-29, 200-299)
    for (const h of allHymns) {
      if (h.number !== targetNum && h.number.toString().startsWith(cleanQ)) {
        results.push({ hymn: h, matchedField: 'number' });
      }
    }

    // Lyric matches containing the number if any
    for (const h of allHymns) {
      if (!h.number.toString().startsWith(cleanQ) && h.searchText.includes(cleanQ)) {
        results.push({ hymn: h, matchedField: 'lyrics' });
      }
    }

    return results;
  }

  // 2. Text Search (Fuzzy / Token matching)
  const tokens = cleanQ.split(/\s+/).filter(Boolean);
  const titleMatches: SearchMatch[] = [];
  const meterMatches: SearchMatch[] = [];
  const lyricMatches: SearchMatch[] = [];

  for (const h of allHymns) {
    const titleLower = h.title.toLowerCase();
    const meterLower = h.meter.toLowerCase();

    // Check title match
    if (tokens.every((tok) => titleLower.includes(tok))) {
      titleMatches.push({ hymn: h, matchedField: 'title' });
      continue;
    }

    // Check meter / tune match
    if (tokens.every((tok) => meterLower.includes(tok))) {
      meterMatches.push({ hymn: h, matchedField: 'meter' });
      continue;
    }

    // Check lyrics match & extract relevant snippet
    let snippet: string | undefined = undefined;
    for (const v of h.verses) {
      for (const line of v.lines) {
        const lineLower = line.toLowerCase();
        if (tokens.some((tok) => lineLower.includes(tok))) {
          snippet = `v${v.number}: "${line}"`;
          break;
        }
      }
      if (snippet) break;
    }

    if (!snippet && h.chorus) {
      for (const line of h.chorus) {
        if (tokens.some((tok) => line.toLowerCase().includes(tok))) {
          snippet = `Chorus: "${line}"`;
          break;
        }
      }
    }

    if (snippet || tokens.every((tok) => h.searchText.includes(tok))) {
      lyricMatches.push({
        hymn: h,
        matchedField: 'lyrics',
        snippet: snippet || h.verses[0]?.lines[0],
      });
    }
  }

  return [...titleMatches, ...meterMatches, ...lyricMatches];
}

export interface SectionGroup {
  id: number;
  name: string;
  title: string;
  hymns: Hymn[];
}

export function getSections(): SectionGroup[] {
  const map = new Map<number, SectionGroup>();
  for (const h of allHymns) {
    if (!map.has(h.sectionId)) {
      map.set(h.sectionId, {
        id: h.sectionId,
        name: h.sectionName,
        title: h.sectionTitle,
        hymns: [],
      });
    }
    map.get(h.sectionId)!.hymns.push(h);
  }
  return Array.from(map.values()).sort((a, b) => a.id - b.id);
}

export interface LetterGroup {
  letter: string;
  hymns: Hymn[];
}

export function getAlphabeticalIndex(): LetterGroup[] {
  const map = new Map<string, Hymn[]>();
  for (const h of allHymns) {
    // Strip leading quotes or punctuation
    const cleanFirst = h.firstLine.replace(/^['"“‘\s]+/, '');
    const firstChar = (cleanFirst[0] || 'A').toUpperCase();
    const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';
    if (!map.has(letter)) {
      map.set(letter, []);
    }
    map.get(letter)!.push(h);
  }

  const sortedLetters = Array.from(map.keys()).sort((a, b) => {
    if (a === '#') return 1;
    if (b === '#') return -1;
    return a.localeCompare(b);
  });

  return sortedLetters.map((letter) => ({
    letter,
    hymns: map.get(letter)!.sort((a, b) => a.firstLine.localeCompare(b.firstLine)),
  }));
}
