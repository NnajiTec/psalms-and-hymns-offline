export interface Verse {
  number: number;
  lines: string[];
  sign?: string;
  signMeaning?: string;
}

export interface Hymn {
  id: number;
  number: number;
  title: string;
  firstLine: string;
  meter: string;
  sectionId: number;
  sectionName: string;
  sectionTitle: string;
  scripture: string | null;
  verseCount: number;
  verses: Verse[];
  chorus: string[] | null;
  searchText: string;
  sign?: '*' | '†' | '*†' | string;
  signMeaning?: string;
}

export type ThemeMode = 'light' | 'dark';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type FontFamily = 'serif' | 'sans';
export type LineHeight = 'normal' | 'relaxed' | 'loose';
export type TextAlign = 'left' | 'center' | 'justify';

export interface AppSettings {
  theme: ThemeMode;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineHeight: LineHeight;
  textAlign: TextAlign;
  keepScreenAwake: boolean;
  repeatChorus: boolean;
  hapticFeedback: boolean;
}

export interface Bookmark {
  hymnId: number;
  savedAt: number;
  note?: string;
}

export type ActiveTab = 'browse' | 'dial' | 'search' | 'index' | 'favorites';
export type AppViewTab = 'home' | 'hymns' | 'bible' | 'library' | 'devotions' | 'bookstore' | 'search' | 'saved' | 'settings';
