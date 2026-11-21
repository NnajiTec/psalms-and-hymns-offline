import React, { useState } from 'react';
import { X, Search, BookOpen, Copy, Check } from 'lucide-react';
import { findScriptureByQuery, type ScripturePassage } from '../data/scriptureData';

interface ScriptureDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialReference?: string | null;
  onOpenHymnByNumber?: (hymnNumber: number) => void;
}

export const ScriptureDrawer: React.FC<ScriptureDrawerProps> = ({
  isOpen,
  onClose,
  initialReference,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialReference || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const passages = findScriptureByQuery(searchQuery).filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  const categories = ['All', 'Worship', 'Doctrine', 'Church Order', 'Fellowship'];

  const handleCopyPassage = (p: ScripturePassage) => {
    const text = `${p.reference}\n` + p.verses.map((v) => `${v.verse}. ${v.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg h-full bg-[var(--bg-surface)] border-l border-[var(--border-color)] shadow-[var(--shadow-dock)] flex flex-col animate-slide-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center text-gold">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-main tracking-tight font-serif">Biblical Anchors</h2>
              <p className="text-[11px] text-dim font-sans">Contextual Assembly Scripture Anchors (KJV)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
          <div className="relative flex items-center mb-3">
            <Search size={16} className="absolute left-3 text-dim pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search passage (e.g. Acts 2, Col 3, Word, Fellowship)..."
              className="w-full h-10 pl-9 pr-8 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-xs sm:text-sm text-main placeholder:text-dim outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-dim hover:text-main cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-sub hover:text-main'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Passages List */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {passages.length === 0 ? (
            <div className="text-center py-16 px-4 text-dim">
              <BookOpen size={32} className="mx-auto mb-2 opacity-40 text-gold" />
              <p className="text-sm font-semibold text-main font-serif">No scripture passages found</p>
              <p className="text-xs mt-1">Try searching for keywords like "Worship", "Faithful", or "Christ".</p>
            </div>
          ) : (
            passages.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] p-4 shadow-xs"
              >
                {/* Passage Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-gold font-serif">
                      {p.reference}
                    </span>
                    <span className="ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[var(--accent-bg)] text-gold border border-[var(--accent)]/30 font-sans">
                      {p.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyPassage(p)}
                    className="p-1.5 rounded-lg text-dim hover:text-main hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                    title="Copy Scripture Passage"
                  >
                    {copiedId === p.id ? (
                      <Check size={15} className="text-emerald-500" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                <div className="text-xs font-semibold text-dim mb-3 font-sans">
                  {p.theme}
                </div>

                {/* Verses */}
                <div className="font-serif text-main text-sm leading-relaxed space-y-1.5 pl-2.5 border-l-2 border-[var(--accent)]">
                  {p.verses.map((v) => (
                    <div key={v.verse} className="flex gap-2">
                      <span className="font-sans font-bold text-[11px] text-gold shrink-0 select-none pt-0.5">
                        {v.verse}
                      </span>
                      <span>{v.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-[var(--bg-header)] border-t border-[var(--border-color)] text-center text-[11px] text-dim font-sans">
          Authorized King James Version (KJV) • Offline Indexed
        </div>
      </div>
    </div>
  );
};

export default ScriptureDrawer;
