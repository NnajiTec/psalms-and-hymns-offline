import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search as SearchIcon, X, Bookmark, ChevronRight, Sparkles, Music, ListFilter } from 'lucide-react';
import type { Hymn } from '../types/hymn';
import { searchHymns, parseMeterAndTune, getAlphabeticalIndex, type SearchMatch } from '../services/search';
import { formatHymnTitle } from './HomeDashboard';

interface SearchViewProps {
  onSelectHymn: (hymn: Hymn) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  initialQuery?: string;
}

export const SearchView: React.FC<SearchViewProps> = ({
  onSelectHymn,
  favorites,
  onToggleFavorite,
  initialQuery = '',
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'index'>(initialQuery ? 'search' : 'search');
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const letterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setDebouncedQuery(initialQuery);
      setActiveTab('search');
    }
  }, [initialQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);
    return () => clearTimeout(handler);
  }, [query]);

  const results: SearchMatch[] = useMemo(() => {
    return searchHymns(debouncedQuery);
  }, [debouncedQuery]);

  const indexGroups = useMemo(() => {
    return getAlphabeticalIndex();
  }, []);

  const scrollToLetter = (letter: string) => {
    const el = letterRefs.current[letter];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickKeywords = ['Cross', 'Blood', 'Praise', 'Grace', 'Glory', 'Resurrection', 'Love', 'Peace', 'Lamb', 'Table'];

  return (
    <div
      className="flex-1 w-full min-h-0 overflow-y-auto pb-52 scroll-smooth app-bg touch-pan-y overscroll-contain select-none"
      style={{
        paddingTop: 'max(env(safe-area-inset-top, 24px), 24px)',
      }}
    >
      <div className="max-w-xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Mode Switcher: Search Lyrics vs A-Z Index */}
        <div className="flex p-1 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] mb-3 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'search'
                ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                : 'text-sub hover:text-main'
            }`}
          >
            <SearchIcon size={14} />
            <span>Search Lyrics &amp; Topics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('index')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'index'
                ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                : 'text-sub hover:text-main'
            }`}
          >
            <ListFilter size={14} />
            <span>A–Z Alphabetical Index</span>
          </button>
        </div>

        {activeTab === 'search' ? (
          <div>
            {/* Search Input Bar */}
            <div className="sticky top-0 z-20 pb-3 bg-[var(--bg-app)]/95 backdrop-blur-md">
              <div className="relative flex items-center">
                <SearchIcon
                  size={18}
                  className="absolute left-4 text-dim pointer-events-none"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by hymn #, title, lyric line, or tune..."
                  autoFocus={!initialQuery}
                  className="w-full h-12 pl-11 pr-11 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-main placeholder:text-dim text-xs sm:text-sm font-medium outline-none shadow-xs focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3.5 p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main cursor-pointer transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Quick Keyword Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none mt-2.5 pt-1">
                <span className="text-[10px] font-bold text-dim uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                  <Sparkles size={12} className="text-[var(--accent)]" /> Topics:
                </span>
                {quickKeywords.map((kw) => {
                  const isActive = query.toLowerCase() === kw.toLowerCase();
                  return (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setQuery(kw)}
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                          : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main'
                      }`}
                    >
                      {kw}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex justify-between items-center my-3 text-xs font-semibold text-dim px-1">
              <span>
                {debouncedQuery
                  ? `Found ${results.length} match${results.length === 1 ? '' : 'es'}`
                  : 'Showing all 500 hymns'}
              </span>
              {debouncedQuery && (
                <span className="text-[11px] text-dim">
                  Query: <span className="text-[var(--accent)] font-bold">&ldquo;{debouncedQuery}&rdquo;</span>
                </span>
              )}
            </div>

            {/* Search Results List: Responsive 2-column grid on wider screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {results.map(({ hymn, matchedField, snippet }) => {
                const isFav = favorites.includes(hymn.number);
                const parsed = parseMeterAndTune(hymn.meter);

                return (
                  <div
                    key={hymn.number}
                    onClick={() => onSelectHymn(hymn)}
                    className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent)]/50 cursor-pointer transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] text-[var(--accent)] font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                        {hymn.number}
                        {hymn.sign && <span className="text-[10px] ml-0.5">{hymn.sign}</span>}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <h3 className="text-xs sm:text-sm font-serif font-bold text-main leading-snug truncate group-hover:text-[var(--accent)] transition-colors">
                            {formatHymnTitle(hymn.title)}
                          </h3>
                          {hymn.sign && (
                            <span className="px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[9px] font-mono font-bold shrink-0">
                              {hymn.sign}
                            </span>
                          )}
                        </div>

                        {snippet && matchedField === 'lyrics' ? (
                          <div className="text-xs text-[var(--accent)] font-serif italic truncate mt-0.5">
                            &ldquo;{snippet}&rdquo;
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[11px] text-dim mt-0.5 truncate">
                            {parsed.tune && (
                              <span className="inline-flex items-center gap-1 text-[var(--accent)] font-medium">
                                <Music size={11} />
                                <span>{parsed.tune}</span>
                              </span>
                            )}
                            {parsed.tune && parsed.meter && <span>•</span>}
                            {parsed.meter && <span className="font-mono text-[10px]">{parsed.meter}</span>}
                            <span>•</span>
                            <span>{hymn.verseCount} verses</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(hymn.number);
                        }}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          isFav
                            ? 'text-[var(--accent)] bg-[var(--accent-bg)] border border-[var(--accent)]/30'
                            : 'text-dim hover:text-main hover:bg-[var(--bg-surface-alt)]'
                        }`}
                        title={isFav ? 'Remove Bookmark' : 'Save Bookmark'}
                      >
                        <Bookmark size={17} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                      <ChevronRight size={17} className="text-dim group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* A-Z Alphabetical First-Line Index View */
          <div>
            {/* Quick Scroller */}
            <div className="sticky top-0 z-20 py-2 bg-[var(--bg-app)]/95 backdrop-blur-md flex items-center justify-start md:justify-center gap-1 overflow-x-auto scrollbar-none border-b border-[var(--border-color)]">
              {indexGroups.map((g) => (
                <button
                  key={g.letter}
                  type="button"
                  onClick={() => scrollToLetter(g.letter)}
                  className="w-7 h-7 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs"
                >
                  {g.letter}
                </button>
              ))}
            </div>

            <div className="py-3 space-y-5">
              {indexGroups.map((group) => (
                <div
                  key={group.letter}
                  ref={(el) => { letterRefs.current[group.letter] = el; }}
                  className="scroll-mt-14"
                >
                  <div className="sticky top-12 z-10 py-1.5 px-3 bg-[var(--bg-surface-alt)] rounded-xl flex items-baseline justify-between mb-2.5 border border-[var(--border-color)]">
                    <span className="font-serif font-bold text-base text-[var(--accent)]">
                      {group.letter}
                    </span>
                    <span className="text-[11px] font-mono text-dim">
                      {group.hymns.length} {group.hymns.length === 1 ? 'hymn' : 'hymns'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {group.hymns.map((hymn) => (
                      <div
                        key={hymn.number}
                        onClick={() => onSelectHymn(hymn)}
                        className="group flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:shadow-xs transition-all cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-serif text-main truncate group-hover:text-[var(--accent)] transition-colors mr-3">
                          {formatHymnTitle(hymn.firstLine)}
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--accent)] shrink-0">
                          #{hymn.number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchView;
