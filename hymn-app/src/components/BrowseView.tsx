import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Bookmark, Search, X, Hash, Music, ArrowLeft } from 'lucide-react';
import type { Hymn } from '../types/hymn';
import { allHymns, getSections, parseMeterAndTune } from '../services/search';

interface BrowseViewProps {
  onSelectHymn: (hymn: Hymn) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onOpenDial?: () => void;
  onBackToHome?: () => void;
  initialQuery?: string;
  initialSection?: number | 'all';
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  onSelectHymn,
  favorites,
  onToggleFavorite,
  onOpenDial,
  onBackToHome,
  initialQuery = '',
  initialSection = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSection, setSelectedSection] = useState<number | 'all'>(initialSection);
  const sections = getSections();

  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const activeChipRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active category chip into view smoothly
  useEffect(() => {
    if (activeChipRef.current && chipsContainerRef.current) {
      activeChipRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedSection]);

  // Instant filtering by section + search query
  const filteredHymns = useMemo(() => {
    let list = selectedSection === 'all'
      ? allHymns
      : allHymns.filter((h) => h.sectionId === selectedSection);

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    // Numeric search
    if (/^\d+$/.test(q)) {
      const num = parseInt(q, 10);
      return list.filter((h) => h.number === num || h.number.toString().startsWith(q));
    }

    // Text search (title, first line, meter, author, tune, scripture, search tokens)
    return list.filter((h) =>
      h.title.toLowerCase().includes(q) ||
      h.firstLine.toLowerCase().includes(q) ||
      h.meter.toLowerCase().includes(q) ||
      h.searchText.includes(q)
    );
  }, [selectedSection, searchQuery]);

  return (
    <div
      className="flex-1 w-full min-h-0 overflow-y-auto pb-52 scroll-smooth app-bg touch-pan-y overscroll-contain"
      style={{
        paddingTop: 'max(env(safe-area-inset-top, 24px), 24px)',
      }}
    >
      <div className="max-w-xl mx-auto px-6 sm:px-10 py-4 space-y-4">
        {/* Sticky Header with Search Bar and Section Chips */}
        <div className="sticky top-0 z-20 pb-3 pt-1 bg-[var(--bg-app)]/95 backdrop-blur-md">
          {onBackToHome && (
            <div className="flex items-center gap-2 mb-2 select-none">
              <button
                type="button"
                onClick={onBackToHome}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main text-xs font-semibold cursor-pointer transition-colors shadow-xs"
              >
                <ArrowLeft size={14} />
                <span>Home Library</span>
              </button>
              <span className="text-xs font-serif font-bold text-main">
                {selectedSection === 'all' ? 'All 500 Hymns' : 'Hymns & Psalms'}
              </span>
            </div>
          )}

          {/* Refined Rounded Search Bar */}
          <div className="relative flex items-center">
            <div
              className="absolute flex items-center justify-center pointer-events-none text-dim z-10"
              style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px' }}
            >
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hymns, titles or numbers..."
              style={{
                paddingLeft: '48px',
                paddingRight: '80px',
              }}
              className="w-full h-11 sm:h-12 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-main placeholder:text-dim text-sm font-medium outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 shadow-sm transition-all"
            />
            <div className="absolute right-2.5 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-dim hover:text-main rounded-full hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
              {onOpenDial && (
                <button
                  type="button"
                  onClick={onOpenDial}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[var(--bg-surface-alt)] text-sub hover:text-main text-xs font-semibold cursor-pointer border border-[var(--border-color)]/60 hover:border-[var(--accent)] transition-all"
                  title="Keypad Jump"
                >
                  <Hash size={13} className="text-gold" />
                  <span>Dial</span>
                </button>
              )}
            </div>
          </div>

          {/* Horizontally Scrollable Category Chips */}
          <div
            ref={chipsContainerRef}
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-none mt-2.5 pt-0.5 pb-1 select-none scroll-smooth"
          >
            <button
              ref={selectedSection === 'all' ? (el) => { activeChipRef.current = el; } : null}
              onClick={() => setSelectedSection('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                selectedSection === 'all'
                  ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main hover:border-[var(--accent)]/50'
              }`}
            >
              All (500)
            </button>

            {sections.map((sec) => {
              const isSelected = selectedSection === sec.id;
              return (
                <button
                  key={sec.id}
                  ref={isSelected ? (el) => { activeChipRef.current = el; } : null}
                  onClick={() => setSelectedSection(sec.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
                      : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main hover:border-[var(--accent)]/50'
                  }`}
                >
                  {sec.name.replace('SECTION ', 'Section ')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section / Search Status Info */}
        <div className="py-2 px-1 text-xs font-medium text-dim flex justify-between items-center">
          <span>
            {searchQuery
              ? `Found ${filteredHymns.length} hymn${filteredHymns.length === 1 ? '' : 's'}`
              : selectedSection === 'all'
              ? '500 Psalms, Hymns & Spiritual Songs'
              : `Section ${selectedSection} • ${filteredHymns.length} hymns`}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-gold hover:underline cursor-pointer"
            >
              Show all
            </button>
          )}
        </div>

        {/* Premium Hymn List */}
        <div className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)] bg-[var(--bg-surface)] rounded-2xl overflow-hidden shadow-sm">
          {filteredHymns.length === 0 ? (
            <div className="py-20 text-center text-dim text-sm px-4">
              <p className="font-serif text-base text-main mb-1">No hymns found</p>
              <p className="text-xs">No match for "{searchQuery}". Try a different title, number, or keyword.</p>
            </div>
          ) : (
            filteredHymns.map((hymn) => {
              const isFav = favorites.includes(hymn.number);
              const parsed = parseMeterAndTune(hymn.meter);

              return (
                <div
                  key={hymn.number}
                  onClick={() => onSelectHymn(hymn)}
                  className={`group flex items-center justify-between py-3.5 px-3 sm:px-4 hover:bg-[var(--bg-surface-alt)]/60 transition-colors cursor-pointer ${
                    isFav ? 'bg-[var(--accent-bg)]/30' : ''
                  }`}
                >
                  <div className="flex items-baseline gap-3.5 sm:gap-4 min-w-0 pr-2">
                    {/* Hymn Number in Warm Bronze */}
                    <span className="font-mono text-sm sm:text-base font-bold text-gold w-9 sm:w-10 shrink-0 text-right">
                      {hymn.number}
                      {hymn.sign && <span className="text-xs font-black ml-0.5 text-amber-500">{hymn.sign}</span>}
                    </span>

                    {/* Hymn Title & Metadata */}
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

                  {/* Bookmark Toggle Icon */}
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
                    title={isFav ? 'Remove from Saved' : 'Save Hymn'}
                    aria-label={isFav ? 'Remove from Saved' : 'Save Hymn'}
                  >
                    <Bookmark
                      size={18}
                      fill={isFav ? 'currentColor' : 'none'}
                      strokeWidth={isFav ? 2.2 : 1.8}
                    />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseView;
