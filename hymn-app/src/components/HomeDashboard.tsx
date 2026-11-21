import React, { useState } from 'react';
import {
  Search,
  Clock,
  Star,
  ChevronRight,
  Menu,
  X,
  Hash,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import type { Hymn } from '../types/hymn';
import { getHymnByNumber, getSections } from '../services/search';

// Helper to normalize ALL-CAPS first words like "CROWNS of glory" -> "Crowns of glory"
export function formatHymnTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  return rawTitle.replace(/^([A-Z]{2,})(\b)/, (_, cap, rest) => {
    return cap[0] + cap.slice(1).toLowerCase() + rest;
  });
}

interface HomeDashboardProps {
  onSelectHymn: (hymn: Hymn) => void;
  onOpenAllHymns: (sectionId?: number) => void;
  onOpenPsalms: () => void;
  onOpenSaved: () => void;
  onOpenSettings: () => void;
  onOpenSearch: (query?: string) => void;
  onOpenMenu?: () => void;
  onOpenDial?: () => void;
  onOpenBible?: () => void;
  recentHymnNumber?: number;
  recentHymnNumbers?: number[];
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onSelectHymn,
  onOpenAllHymns,
  onOpenPsalms,
  onOpenSaved,
  onOpenSearch,
  onOpenMenu,
  onOpenDial,
  onOpenBible,
  recentHymnNumber = 3,
  recentHymnNumbers,
}) => {
  const [quickQuery, setQuickQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'hymns' | 'psalms'>('all');

  const allSections = getSections();

  // Resolve recently opened hymns (up to 2 if available in history)
  const resolvedRecentNumbers = recentHymnNumbers && recentHymnNumbers.length > 0
    ? recentHymnNumbers.slice(0, 2)
    : [recentHymnNumber];

  const recentHymns = resolvedRecentNumbers
    .map((num) => getHymnByNumber(num))
    .filter((h): h is Hymn => h !== null && h !== undefined);

  if (recentHymns.length === 0) {
    const defaultHymn = getHymnByNumber(3);
    if (defaultHymn) recentHymns.push(defaultHymn);
  }

  // Filtered popular items based on segmented control selection
  const getPopularHymns = (): Hymn[] => {
    let numbers: number[];
    if (activeFilter === 'psalms') {
      numbers = [1, 2, 8, 15, 23];
    } else if (activeFilter === 'hymns') {
      numbers = [26, 78, 110, 195];
    } else {
      numbers = [1, 2, 8, 15];
    }

    return numbers
      .map((num) => getHymnByNumber(num))
      .filter((h): h is Hymn => h !== null && h !== undefined);
  };

  const popularHymns = getPopularHymns();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      const num = parseInt(quickQuery.trim(), 10);
      if (!isNaN(num) && num >= 1 && num <= 500) {
        const target = getHymnByNumber(num);
        if (target) {
          onSelectHymn(target);
          return;
        }
      }
      onOpenSearch(quickQuery.trim());
    } else {
      onOpenSearch();
    }
  };

  const handleSeeAllPopular = () => {
    if (activeFilter === 'psalms') {
      onOpenPsalms();
    } else {
      onOpenAllHymns();
    }
  };

  return (
    <div className="flex-1 w-full min-h-0 overflow-y-auto pb-52 scroll-smooth app-bg touch-pan-y overscroll-contain select-none">
      {/* =========================================================================
          1. FULL-WIDTH SACRED HEADER (Clean Edge-to-Edge with Safe Area)
          Deep Sanctuary Navy (#111726 to #182238) with Warm Gold Accents
          ========================================================================= */}
      <header
        className="w-full bg-gradient-to-b from-[#111726] via-[#182238] to-[#141C2E] border-b border-white/10 text-white select-none relative shadow-md"
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 24px), 24px)',
        }}
      >
        {/* Subtle gold ornamental top rim */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80" />

        <div className="max-w-xl mx-auto px-6 sm:px-10 pt-4 pb-6">
          {/* Top Bar: Status Badge + Action Buttons */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-xs" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-amber-200/90">
                The Believer’s Companion
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onOpenDial && (
                <button
                  type="button"
                  onClick={onOpenDial}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold cursor-pointer transition-all active:scale-95 border border-white/15"
                  title="Keypad Jump"
                >
                  <Hash size={13} className="text-amber-300" />
                  <span>Dial</span>
                </button>
              )}
              {onOpenMenu && (
                <button
                  type="button"
                  onClick={onOpenMenu}
                  className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Open Menu"
                >
                  <Menu size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Banner Body: Title & Sacred Emblem */}
          <div className="flex items-center justify-between pt-1">
            <div className="min-w-0 flex-1 pr-4">
              <h1 className="text-2xl sm:text-[28px] font-serif font-extrabold text-white leading-tight tracking-tight">
                The Believer’s Companion
              </h1>
              <p className="text-xs sm:text-sm font-serif italic text-amber-200/90 mt-1 tracking-wide">
                500 Hymns • Holy Bible • Daily Devotions
              </p>
            </div>

            {/* Sacred Cross & Bible Emblem (New Brand Logo) */}
            <div className="w-13 h-13 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-amber-300/30 bg-black/20">
              <img src="/app-icon.png" alt="The Believer’s Companion Emblem" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HOME CONTENT: Generous, Spacious Margin Container (Matching Settings)
          ========================================================================= */}
      <div className="max-w-xl mx-auto px-6 sm:px-10 py-6 space-y-7 pb-52">
        
        {/* =========================================================================
            2. ROUNDED SEARCH BAR
            ========================================================================= */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <div
            className="absolute flex items-center justify-center pointer-events-none text-dim z-10"
            style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px' }}
          >
            <Search size={18} />
          </div>
          <input
            type="text"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            placeholder="Search by hymn #, title, or lyric line..."
            style={{
              paddingLeft: '48px',
              paddingRight: '44px',
            }}
            className="w-full h-12 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-main placeholder:text-dim text-xs sm:text-sm font-medium outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 shadow-xs transition-all"
          />
          {quickQuery && (
            <button
              type="button"
              onClick={() => setQuickQuery('')}
              className="absolute right-3.5 p-1 text-dim hover:text-main rounded-full cursor-pointer"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </form>

        {/* =========================================================================
            HOLY BIBLE QUICK CARD
            ========================================================================= */}
        {onOpenBible && (
          <button
            type="button"
            onClick={onOpenBible}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#182238] to-[#253556] text-white flex items-center justify-between border border-amber-300/20 shadow-md hover:border-amber-300/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 text-left min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform shrink-0">
                <BookOpen size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif font-bold text-base text-white">Holy Bible</h3>
                <p className="text-xs text-amber-200/80 font-sans mt-0.5 truncate">
                  Read, search and navigate scripture
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-amber-300 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
          </button>
        )}

        {/* =========================================================================
            3. SEGMENTED FILTER CONTROL (All | Hymns | Psalms)
            ========================================================================= */}
        <div className="grid grid-cols-3 p-1 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-xs sm:text-sm font-semibold select-none shadow-xs gap-1">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`py-2.5 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeFilter === 'all'
                ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                : 'text-sub hover:text-main'
            }`}
          >
            <span>All (500)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('hymns')}
            className={`py-2.5 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeFilter === 'hymns'
                ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                : 'text-sub hover:text-main'
            }`}
          >
            <span>Hymns (475)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('psalms')}
            className={`py-2.5 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
              activeFilter === 'psalms'
                ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                : 'text-sub hover:text-main'
            }`}
          >
            <span>Psalms (25)</span>
          </button>
        </div>

        {/* =========================================================================
            4. RECENTLY OPENED SECTION
            ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-main font-serif">
              <Clock size={16} className="text-[var(--accent)]" />
              <span>Recently Opened</span>
            </div>
            <button
              type="button"
              onClick={onOpenSaved}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>See All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentHymns.map((hymn) => (
              <div
                key={hymn.number}
                onClick={() => onSelectHymn(hymn)}
                className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-xs hover:border-[var(--accent)]/50 hover:bg-[var(--bg-surface-alt)]/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  {/* Warm Bronze Number Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)] text-white text-center flex flex-col items-center justify-center shrink-0 shadow-xs">
                    <span className="text-[8px] font-sans font-bold uppercase tracking-wider leading-none text-white/85">
                      {hymn.number <= 25 ? 'Psalm' : 'Hymn'}
                    </span>
                    <span className="text-sm font-mono font-black leading-tight mt-0.5">
                      {hymn.number}
                      {hymn.sign && <span className="text-[10px] text-amber-200 ml-0.5">{hymn.sign}</span>}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-serif font-bold text-main leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                        {formatHymnTitle(hymn.title)}
                      </h3>
                      {hymn.sign && (
                        <span className="px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[9px] font-mono font-bold shrink-0">
                          {hymn.sign}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-dim font-sans mt-0.5 truncate">
                      {hymn.sectionName.replace('SECTION ', 'Section ')} • {hymn.verseCount} verses
                    </p>
                  </div>
                </div>

                <ChevronRight size={17} className="text-dim shrink-0 group-hover:text-main group-hover:translate-x-0.5 transition-all ml-1" />
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. POPULAR HYMNS / PSALMS SECTION
            ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-main font-serif">
              <Star size={16} className="fill-[var(--accent)] text-[var(--accent)]" />
              <span>
                {activeFilter === 'psalms'
                  ? 'Selected Metrical Psalms'
                  : activeFilter === 'hymns'
                  ? 'Beloved Worship Hymns'
                  : 'Popular Hymns & Psalms'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleSeeAllPopular}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>See All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl divide-y divide-[var(--border-color)] overflow-hidden shadow-xs">
            {popularHymns.map((hymn) => (
              <div
                key={hymn.number}
                onClick={() => onSelectHymn(hymn)}
                className="flex items-center justify-between py-3.5 px-4 sm:px-5 hover:bg-[var(--bg-surface-alt)]/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-bg)] text-[var(--accent)] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                    {hymn.number}
                    {hymn.sign && <span className="text-[10px] ml-0.5">{hymn.sign}</span>}
                  </div>
                  <h3 className="text-xs sm:text-sm font-serif font-semibold text-main leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                    {formatHymnTitle(hymn.title)}
                  </h3>
                </div>

                <ChevronRight size={16} className="text-dim shrink-0 group-hover:text-main group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. HYMNAL SECTIONS & METRICAL PSALMS
            ========================================================================= */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-main font-serif">
              <Sparkles size={16} className="text-[var(--accent)]" />
              <span>Browse by Category</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenAllHymns()}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>All Sections</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allSections.slice(0, 6).map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => onOpenAllHymns(section.id)}
                className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-surface-alt)]/40 transition-all text-left shadow-xs flex items-center justify-between group cursor-pointer"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <span className="text-[10px] font-mono font-bold text-[var(--accent)] uppercase tracking-wider block">
                    {section.name.replace('SECTION ', 'Part ')}
                  </span>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-main mt-0.5 group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {section.title}
                  </h4>
                  <span className="text-xs font-mono text-dim mt-1 block">
                    {section.hymns.length} hymns
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--bg-surface-alt)] flex items-center justify-center text-dim group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all shrink-0">
                  <ChevronRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. SCRIPTURE BENEDICTION BANNER (Psalm 150:6)
            ========================================================================= */}
        <div className="rounded-2xl p-4 sm:p-5 shadow-xs select-none border border-[var(--accent)]/30 bg-[var(--bg-surface-alt)] text-main text-center">
          <p className="text-xs sm:text-sm font-serif font-bold text-main leading-relaxed">
            &ldquo;Let everything that hath breath{' '}
            <span className="text-[var(--accent)] font-extrabold underline decoration-[var(--accent)]/40">
              praise the Lord!
            </span>&rdquo;
          </p>
          <p className="text-[10px] sm:text-[11px] font-serif italic text-dim mt-1 tracking-wider">
            Psalm 150:6 • Sacred Hymnal Collection
          </p>
        </div>

        {/* Bottom Clearance Spacer */}
        <div className="h-20" aria-hidden="true" />
      </div>
    </div>
  );
};

export default HomeDashboard;
