import React, { useState, useEffect, useMemo } from 'react';
import { Anchor, Search, BookOpen, Copy, Check, Share2, X, Sparkles, BookMarked } from 'lucide-react';
import { findScriptureByQuery, curatedScriptures, type ScripturePassage } from '../data/scriptureData';

interface AnchorViewProps {
  initialReference?: string | null;
  onOpenBibleVerse?: (book: string, chapter: number) => void;
  onOpenHymnByNumber?: (hymnNumber: number) => void;
}

export const AnchorView: React.FC<AnchorViewProps> = ({
  initialReference,
  onOpenBibleVerse,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialReference || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Sync when initialReference changes from external links
  useEffect(() => {
    if (initialReference) {
      setSearchQuery(initialReference);
      setSelectedCategory('All');
    }
  }, [initialReference]);

  const categories = ['All', 'Worship', 'Doctrine', 'Church Order', 'Fellowship'];

  const filteredPassages = useMemo(() => {
    return findScriptureByQuery(searchQuery).filter(
      (p) => selectedCategory === 'All' || p.category === selectedCategory
    );
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: curatedScriptures.length };
    curatedScriptures.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCopyPassage = (p: ScripturePassage) => {
    const text = `${p.reference} (${p.category} • ${p.theme})\n\n` +
      p.verses.map((v) => `${v.verse}. ${v.text}`).join('\n\n') +
      '\n\n— The Believer’s Companion (KJV)';
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    showToast(`Copied ${p.reference} to clipboard`);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleSharePassage = async (p: ScripturePassage) => {
    const text = `${p.reference}\n${p.theme}\n\n` +
      p.verses.map((v) => `${v.verse}. ${v.text}`).join('\n\n');
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Biblical Anchor: ${p.reference}`,
          text,
        });
      } catch {
        // User cancelled or share dismissed
      }
    } else {
      handleCopyPassage(p);
    }
  };

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-main)] text-main overflow-hidden relative select-none">
      {/* Header Banner */}
      <header
        className="sticky top-0 z-20 shrink-0 px-4 sm:px-8 py-3.5 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between"
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 16px), 16px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-gold shadow-xs">
            <Anchor size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif font-bold text-main tracking-tight leading-tight">
                Biblical Anchors
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-gold border border-amber-500/25">
                10 Assembly Pillars
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-dim font-sans">
              Curated Assembly Scripture Anchors &amp; Foundational Truths (KJV)
            </p>
          </div>
        </div>

        {/* Quick count indicator */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-dim px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <Sparkles size={13} className="text-gold" />
          <span>{filteredPassages.length} {filteredPassages.length === 1 ? 'passage' : 'passages'}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div
        className="flex-1 overflow-y-auto px-4 sm:px-8 pt-4 pb-28 sm:pb-32 space-y-4 max-w-6xl mx-auto w-full"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Search & Category Filter Bar */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-3 sm:p-4 shadow-xs space-y-3">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-dim pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anchors by keyword, passage, book, or doctrine (e.g. Worship, Acts, Christ)..."
              className="w-full h-10 pl-10 pr-9 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-xs sm:text-sm text-main placeholder:text-dim outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-dim hover:text-main cursor-pointer"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-sub hover:text-main hover:bg-[var(--border-subtle)]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/25 text-white' : 'bg-black/10 dark:bg-white/10 text-dim'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredPassages.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center text-gold">
              <Anchor size={28} />
            </div>
            <h3 className="text-base font-serif font-bold text-main">No Biblical Anchors Match</h3>
            <p className="text-xs text-dim max-w-sm mx-auto">
              No passages found matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Fellowship&rdquo;, &ldquo;Worship&rdquo;, &ldquo;Blood&rdquo;, or &ldquo;Truth&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--accent-bg)] text-gold border border-[var(--accent)]/30 hover:bg-[var(--accent-bg-subtle)] transition-all cursor-pointer"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          /* Cards Grid: 1 column on mobile, 2 columns on wide screens */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPassages.map((p) => {
              const isCopied = copiedId === p.id;
              return (
                <article
                  key={p.id}
                  className="rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-4 sm:p-5 shadow-xs hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header: Reference, Category, and Action Buttons */}
                    <div className="flex items-start justify-between gap-3 mb-2.5 pb-2.5 border-b border-[var(--border-color)]">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-base sm:text-lg font-bold text-gold font-serif tracking-tight">
                            {p.reference}
                          </h2>
                          <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-gold border border-amber-500/30 font-sans tracking-wider">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-dim mt-0.5 font-sans">
                          {p.theme}
                        </p>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {onOpenBibleVerse && (
                          <button
                            type="button"
                            onClick={() => onOpenBibleVerse(p.book, p.chapter)}
                            title={`Read ${p.book} ${p.chapter} in Holy Bible`}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 transition-colors cursor-pointer"
                          >
                            <BookOpen size={13} />
                            <span className="hidden sm:inline font-sans">Read in Bible</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopyPassage(p)}
                          title="Copy scripture passage"
                          className="p-1.5 sm:p-2 rounded-xl text-dim hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer"
                        >
                          {isCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSharePassage(p)}
                          title="Share scripture passage"
                          className="p-1.5 sm:p-2 rounded-xl text-dim hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Verses Content with Devotional Typography */}
                    <div className="font-serif text-main text-sm sm:text-[15px] leading-relaxed space-y-2.5 pl-3 border-l-2 border-amber-500/60 my-3">
                      {p.verses.map((v) => (
                        <div key={v.verse} className="flex gap-2.5 items-baseline">
                          <span className="font-sans font-bold text-xs text-gold/90 shrink-0 select-none">
                            {v.verse}
                          </span>
                          <span className="opacity-95">{v.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta Bar */}
                  <div className="pt-2.5 mt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-dim font-sans">
                    <span className="flex items-center gap-1.5">
                      <BookMarked size={12} className="text-gold opacity-75" />
                      <span>{p.book} Ch. {p.chapter}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenBibleVerse?.(p.book, p.chapter)}
                      className="text-gold hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open in Reader</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed bottom-24 sm:bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#182238] text-white text-xs font-medium shadow-xl border border-white/10 animate-fade-in flex items-center gap-2 pointer-events-none">
          <Check size={14} className="text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}
    </div>
  );
};

export default AnchorView;
