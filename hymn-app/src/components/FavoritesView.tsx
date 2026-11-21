import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, Music, BookOpen } from 'lucide-react';
import type { Hymn } from '../types/hymn';
import { getHymnByNumber, parseMeterAndTune } from '../services/search';
import {
  getBibleBookmarks,
  removeBibleBookmark,
  type BibleBookmarkItem,
} from '../services/bibleService';

interface FavoritesViewProps {
  onSelectHymn: (hymn: Hymn) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  history: number[];
  onClearHistory: () => void;
  onOpenBibleVerse?: (book: string, chapter: number, verse: number) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectHymn,
  favorites,
  onToggleFavorite,
  history,
  onClearHistory,
  onOpenBibleVerse,
}) => {
  const [subTab, setSubTab] = useState<'favorites' | 'verses' | 'history'>('favorites');
  const [bibleBookmarks, setBibleBookmarks] = useState<BibleBookmarkItem[]>([]);

  const loadVerses = async () => {
    const list = await getBibleBookmarks();
    setBibleBookmarks(list);
  };

  useEffect(() => {
    loadVerses();
  }, [subTab]);

  const handleRemoveVerse = async (bm: BibleBookmarkItem) => {
    await removeBibleBookmark(bm.book, bm.chapter, bm.verse);
    setBibleBookmarks((prev) => prev.filter((item) => item.key !== bm.key));
  };

  const favoriteHymns = favorites
    .map((num) => getHymnByNumber(num))
    .filter((h): h is Hymn => h !== undefined);

  const historyHymns = history
    .map((num) => getHymnByNumber(num))
    .filter((h): h is Hymn => h !== undefined);

  const activeList = subTab === 'favorites' ? favoriteHymns : historyHymns;

  return (
    <div
      className="flex-1 w-full min-h-0 overflow-y-auto pb-52 pt-2 scroll-smooth app-bg"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="max-w-xl mx-auto px-6 sm:px-10 py-6 space-y-5">
        {/* Modern 3-Pill Switcher */}
        <div className="flex p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] mb-5 shadow-xs">
          <button
            type="button"
            onClick={() => setSubTab('favorites')}
            className={`flex-1 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer ${
              subTab === 'favorites'
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'text-sub hover:text-main'
            }`}
          >
            Hymns ({favorites.length})
          </button>

          <button
            type="button"
            onClick={() => setSubTab('verses')}
            className={`flex-1 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer ${
              subTab === 'verses'
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'text-sub hover:text-main'
            }`}
          >
            Verses ({bibleBookmarks.length})
          </button>

          <button
            type="button"
            onClick={() => setSubTab('history')}
            className={`flex-1 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer ${
              subTab === 'history'
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'text-sub hover:text-main'
            }`}
          >
            History ({history.length})
          </button>
        </div>

        {/* Clear History Button if on history tab */}
        {subTab === 'history' && history.length > 0 && (
          <div className="flex justify-end mb-3">
            <button
              type="button"
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-xs font-medium text-dim hover:text-rose-500 hover:border-rose-300 transition-colors cursor-pointer"
            >
              <Trash2 size={12} />
              <span>Clear History</span>
            </button>
          </div>
        )}

        {/* BIBLE VERSES TAB CONTENT */}
        {subTab === 'verses' ? (
          bibleBookmarks.length === 0 ? (
            <div className="text-center py-24 px-6 text-dim bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)]">
              <p className="text-base font-serif text-main mb-1">No bookmarked verses yet</p>
              <p className="text-xs text-dim">
                Tap any verse while reading the Holy Bible to bookmark it for reflection.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bibleBookmarks.map((bm) => (
                <div
                  key={bm.key}
                  className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs flex items-start justify-between gap-3"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => onOpenBibleVerse?.(bm.book, bm.chapter, bm.verse)}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <BookOpen size={14} className="text-gold shrink-0" />
                      <span className="font-serif font-bold text-sm text-gold">
                        {bm.book} {bm.chapter}:{bm.verse}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[var(--accent-bg)] text-gold font-bold">
                        {bm.version.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm text-main leading-relaxed">
                      "{bm.text}"
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveVerse(bm)}
                    className="p-1.5 text-dim hover:text-rose-500 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Remove Bookmark"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          /* HYMNS & HISTORY LIST */
          activeList.length === 0 ? (
            <div className="text-center py-24 px-6 text-dim bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)]">
              <p className="text-base font-serif text-main mb-1">
                {subTab === 'favorites' ? 'No bookmarks saved yet' : 'No recent hymns'}
              </p>
              <p className="text-xs text-dim">
                {subTab === 'favorites'
                  ? 'Tap the bookmark icon while reading any hymn to save it for quick access.'
                  : 'Hymns you view will appear here for easy reference.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)] bg-[var(--bg-surface)] rounded-2xl overflow-hidden shadow-xs">
              {activeList.map((hymn) => {
                const isFav = favorites.includes(hymn.number);
                const parsed = parseMeterAndTune(hymn.meter);

                return (
                  <div
                    key={hymn.number}
                    onClick={() => onSelectHymn(hymn)}
                    className={`group flex items-center justify-between py-3.5 px-3 sm:px-4 hover:bg-[var(--bg-surface-alt)]/60 transition-colors cursor-pointer ${
                      isFav ? 'bg-[var(--accent-bg)]/20' : ''
                    }`}
                  >
                    <div className="flex items-baseline gap-3.5 sm:gap-4 min-w-0 pr-2">
                      <span className="font-mono text-sm sm:text-base font-bold text-gold w-9 sm:w-10 shrink-0 text-right">
                        {hymn.number}
                        {hymn.sign && <span className="text-xs font-black ml-0.5 text-amber-500">{hymn.sign}</span>}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <h3 className="text-base sm:text-lg font-serif font-medium text-main leading-snug truncate group-hover:text-gold transition-colors">
                            {hymn.title}
                          </h3>
                          {hymn.sign && (
                            <span className="px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[9px] font-mono font-bold shrink-0">
                              {hymn.sign}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-dim mt-1 truncate font-sans">
                          {parsed.tune && (
                            <span className="text-gold font-medium truncate flex items-center gap-1">
                              <Music size={11} className="shrink-0" />
                              <span>{parsed.tune}</span>
                            </span>
                          )}
                          {parsed.tune && parsed.meter && <span>•</span>}
                          {parsed.meter && (
                            <span className="font-mono text-[11px] text-dim">{parsed.meter}</span>
                          )}
                          <span>•</span>
                          <span>{hymn.verseCount}v</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(hymn.number);
                      }}
                      className={`p-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                        isFav
                          ? 'text-gold'
                          : 'text-dim/40 hover:text-dim hover:bg-[var(--bg-surface-alt)]'
                      }`}
                      title={isFav ? 'Remove Bookmark' : 'Bookmark Hymn'}
                      aria-label={isFav ? 'Remove Bookmark' : 'Bookmark Hymn'}
                    >
                      <Bookmark
                        size={18}
                        fill={isFav ? 'currentColor' : 'none'}
                        strokeWidth={isFav ? 2.2 : 1.8}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesView;
