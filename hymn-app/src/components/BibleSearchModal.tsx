import React, { useState } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { searchScripture, type BibleSearchResult } from '../services/bibleService';

interface BibleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVersion: string;
  onSelectPassage: (book: string, chapter: number, verse: number) => void;
}

export const BibleSearchModal: React.FC<BibleSearchModalProps> = ({
  isOpen,
  onClose,
  currentVersion,
  onSelectPassage,
}) => {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<'all' | 'ot' | 'nt'>('all');
  const [results, setResults] = useState<BibleSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = query.trim();
    if (clean.length < 2) return;

    setIsSearching(true);
    setHasSearched(true);
    try {
      const found = await searchScripture(currentVersion, clean, scope);
      setResults(found);
    } catch (err) {
      console.error('[BibleSearch] Error:', err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const highlightMatch = (text: string, term: string) => {
    if (!term || !term.trim()) return text;
    const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <mark key={i} className="bg-amber-300/40 text-amber-900 dark:text-amber-200 px-0.5 rounded-sm font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[90vh] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up sm:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center text-gold">
              <Search size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-main tracking-tight leading-tight">
                Search Scripture
              </h2>
              <p className="text-[11px] text-dim font-sans">
                Search words or phrases across the Holy Bible ({currentVersion.toUpperCase()})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Search Bar & Scope Filters */}
        <div className="p-4 bg-[var(--bg-surface-alt)] border-b border-[var(--border-color)] space-y-3 shrink-0">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search words (e.g. grace, shepherd, love)..."
                className="w-full h-10 pl-9 pr-8 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm text-main placeholder:text-dim font-sans outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-dim hover:text-main cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isSearching || query.trim().length < 2}
              className="h-10 px-4 rounded-xl bg-[var(--accent)] hover:opacity-95 active:scale-95 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              {isSearching ? <Loader2 size={13} className="animate-spin" /> : <span>Search</span>}
            </button>
          </form>

          {/* Scope Filters */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-dim uppercase tracking-wider">Scope:</span>
            {(['all', 'ot', 'nt'] as const).map((sc) => (
              <button
                key={sc}
                type="button"
                onClick={() => setScope(sc)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  scope === sc
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs'
                    : 'bg-[var(--bg-surface)] text-sub border-[var(--border-color)] hover:text-main'
                }`}
              >
                {sc === 'all' ? 'All (66 Books)' : sc === 'ot' ? 'Old Testament' : 'New Testament'}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-none max-h-[58vh]">
          {isSearching && (
            <div className="py-12 flex flex-col items-center justify-center text-dim text-xs gap-2">
              <Loader2 size={24} className="animate-spin text-gold" />
              <span>Searching scripture...</span>
            </div>
          )}

          {!isSearching && hasSearched && results.length === 0 && (
            <div className="py-12 text-center text-dim space-y-1">
              <p className="text-sm font-semibold text-main">No verses found</p>
              <p className="text-xs">Try searching for a different word or expanding the scope.</p>
            </div>
          )}

          {!isSearching && !hasSearched && (
            <div className="py-12 text-center text-dim space-y-1">
              <p className="text-sm font-semibold text-main">Explore Scripture</p>
              <p className="text-xs">Type a keyword or topic above to find matching verses.</p>
            </div>
          )}

          {!isSearching &&
            results.map((r, idx) => (
              <button
                key={`${r.book}_${r.chapter}_${r.verse}_${idx}`}
                type="button"
                onClick={() => {
                  onSelectPassage(r.book, r.chapter, r.verse);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-2xl bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)]/40 border border-[var(--border-color)] hover:border-[var(--accent)]/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif font-bold text-xs sm:text-sm text-gold group-hover:underline">
                    {r.book} {r.chapter}:{r.verse}
                  </span>
                  <span className="text-[10px] font-mono text-dim px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-color)]">
                    {currentVersion.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-main font-serif leading-relaxed">
                  {highlightMatch(r.text, query)}
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BibleSearchModal;
