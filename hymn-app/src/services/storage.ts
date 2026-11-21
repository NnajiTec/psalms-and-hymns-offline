import type { AppSettings } from '../types/hymn';

const SETTINGS_KEY = 'hymn_app_settings_v1';
const FAVORITES_KEY = 'hymn_app_favorites_v1';
const HISTORY_KEY = 'hymn_app_history_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light', // Warm Ivory hymnal standard
  fontFamily: 'serif',
  fontSize: 'lg',
  lineHeight: 'relaxed',
  textAlign: 'left',
  keepScreenAwake: true,
  repeatChorus: false,
  hapticFeedback: true,
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    const theme: 'light' | 'dark' = parsed.theme === 'dark' ? 'dark' : 'light';
    return { ...DEFAULT_SETTINGS, ...parsed, theme };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function loadFavorites(): number[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load favorites:', e);
    return [];
  }
}

export function saveFavorites(favs: number[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (e) {
    console.error('Failed to save favorites:', e);
  }
}

export function toggleFavorite(hymnId: number): number[] {
  const current = loadFavorites();
  const index = current.indexOf(hymnId);
  let updated: number[];
  if (index >= 0) {
    updated = current.filter((id) => id !== hymnId);
  } else {
    updated = [hymnId, ...current];
  }
  saveFavorites(updated);
  return updated;
}

export function loadHistory(): number[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function addToHistory(hymnId: number): void {
  try {
    const current = loadHistory().filter((id) => id !== hymnId);
    const updated = [hymnId, ...current].slice(0, 50); // keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to add to history:', e);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}
