import React, { useRef } from 'react';
import type { Hymn } from '../types/hymn';
import { getAlphabeticalIndex } from '../services/search';

interface IndexViewProps {
  onSelectHymn: (hymn: Hymn) => void;
}

export const IndexView: React.FC<IndexViewProps> = ({ onSelectHymn }) => {
  const groups = getAlphabeticalIndex();
  const letterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToLetter = (letter: string) => {
    const el = letterRefs.current[letter];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="flex-1 w-full min-h-0 overflow-y-auto pb-44 pt-2 scroll-smooth app-bg"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Alphabet Quick Scroller Bar */}
      <div className="sticky top-0 z-20 px-3 sm:px-6 py-2.5 bg-[var(--bg-app)]/95 backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto scrollbar-none select-none">
        {groups.map((g) => (
          <button
            key={g.letter}
            onClick={() => scrollToLetter(g.letter)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--border-color)]/70 bg-[var(--bg-surface)] text-sub hover:text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs"
            title={`Jump to ${g.letter}`}
            aria-label={`Jump to letter ${g.letter}`}
          >
            {g.letter}
          </button>
        ))}
      </div>

      {/* Index Content */}
      <div className="max-w-xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {groups.map((group) => (
          <div
            key={group.letter}
            ref={(el) => { letterRefs.current[group.letter] = el; }}
            className="mb-6 scroll-mt-16"
          >
            {/* Letter Header */}
            <div className="sticky top-12 z-10 py-2 px-3 bg-[var(--bg-surface-alt)]/90 backdrop-blur-sm rounded-xl flex items-baseline justify-between mb-2.5 border border-[var(--border-color)]/70">
              <span className="font-serif font-bold text-lg text-gold">
                {group.letter}
              </span>
              <span className="text-xs font-mono text-dim">
                {group.hymns.length} {group.hymns.length === 1 ? 'hymn' : 'hymns'}
              </span>
            </div>

            {/* Hymns under letter: responsive 2-col grid on tablets/desktops */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {group.hymns.map((hymn) => (
                <div
                  key={hymn.number}
                  onClick={() => onSelectHymn(hymn)}
                  className="group flex items-center justify-between py-2.5 px-3.5 sm:px-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:shadow-xs transition-all cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-serif text-main truncate group-hover:text-gold transition-colors mr-3">
                    {hymn.firstLine}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-gold shrink-0">
                    #{hymn.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexView;
