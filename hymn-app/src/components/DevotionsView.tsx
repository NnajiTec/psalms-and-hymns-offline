import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Music,
  Share2,
  Copy,
  Check,
  Calendar,
} from 'lucide-react';
import type { DailyDevotion } from '../types/library';
import { dailyDevotions } from '../data/libraryData';
import { cacheDevotions } from '../services/db';

interface DevotionsViewProps {
  onOpenHymn: (hymnNumber: number) => void;
}

export const DevotionsView: React.FC<DevotionsViewProps> = ({ onOpenHymn }) => {
  useEffect(() => {
    cacheDevotions(dailyDevotions).catch((err) => console.warn('Devotion cache error:', err));
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const devotion: DailyDevotion = dailyDevotions[currentIndex] || dailyDevotions[0];

  const handleCopy = () => {
    const text = `MORNING MANNA — ${devotion.title} (${devotion.date})\n` +
      `Reading: ${devotion.scriptureReading}\n\n` +
      `"${devotion.keyVerse}" — ${devotion.keyVerseCitation}\n\n` +
      `${devotion.exposition}\n\n` +
      `Prayer: ${devotion.prayer}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: devotion.title,
          text: `"${devotion.keyVerse}" — ${devotion.keyVerseCitation}\n\n${devotion.exposition}`,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex-1 w-full min-h-0 overflow-y-auto pb-44 pt-3 scroll-smooth app-bg" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-8 py-6">
        {/* Date & Day Switcher Bar */}
        <div className="flex items-center justify-between pb-3.5 mb-6 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-sub hover:text-main hover:border-[var(--accent)] transition-all cursor-pointer ${
                currentIndex === 0 ? 'opacity-30 cursor-not-allowed hover:border-[var(--border-color)]' : ''
              }`}
              title="Previous devotion"
              aria-label="Previous devotion"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono font-bold text-gold shadow-sm">
              <Calendar size={13} className="text-gold" />
              <span>{devotion.date}</span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(dailyDevotions.length - 1, prev + 1))}
              disabled={currentIndex === dailyDevotions.length - 1}
              className={`p-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-sub hover:text-main hover:border-[var(--accent)] transition-all cursor-pointer ${
                currentIndex === dailyDevotions.length - 1 ? 'opacity-30 cursor-not-allowed hover:border-[var(--border-color)]' : ''
              }`}
              title="Next devotion"
              aria-label="Next devotion"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-full text-dim hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer"
              title="Copy devotion"
              aria-label="Copy devotion"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full text-dim hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer"
              title="Share devotion"
              aria-label="Share devotion"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Devotion Content */}
        <article className="animate-fade-in space-y-6">
          <header>
            <div className="text-xs font-mono font-medium text-dim mb-1 tracking-wide">
              Reading: {devotion.scriptureReading}
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-main leading-tight">
              {devotion.title}
            </h1>
          </header>

          {/* Key Verse Highlight Box */}
          <blockquote className="my-6 pl-4 sm:pl-5 pr-4 py-3.5 border-l-3 border-[var(--accent)] bg-[var(--accent-bg)]/20 rounded-r-2xl text-main italic font-serif text-base sm:text-lg leading-relaxed shadow-sm">
            "{devotion.keyVerse}"
            <footer className="not-italic font-sans text-xs font-bold text-gold mt-2">
              — {devotion.keyVerseCitation}
            </footer>
          </blockquote>

          {/* Exposition */}
          <div className="text-base sm:text-lg text-main font-serif leading-relaxed space-y-4 my-6">
            <p className="whitespace-pre-line">{devotion.exposition}</p>
          </div>

          {/* Reflection Question */}
          {devotion.reflectionQuestion && (
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-gold mb-1">
                Reflect
              </div>
              <p className="font-serif italic text-sm text-main leading-relaxed">
                {devotion.reflectionQuestion}
              </p>
            </div>
          )}

          {/* Prayer */}
          <section className="my-6 p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
            <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-gold mb-2">
              Morning Prayer
            </div>
            <p className="font-serif italic text-sm sm:text-base text-main leading-relaxed">
              "{devotion.prayer}"
            </p>
          </section>

          {/* Companion Hymn */}
          {devotion.relatedHymnNumber && (
            <div className="mt-8 pt-5 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className="text-xs font-medium text-dim font-sans">Companion Hymn</span>
              <button
                type="button"
                onClick={() => onOpenHymn(devotion.relatedHymnNumber!)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-bg)] border border-[var(--accent)]/30 text-gold text-xs font-bold hover:bg-[var(--accent)] hover:text-white transition-all cursor-pointer shadow-sm"
              >
                <Music size={13} />
                <span>Open Hymn #{devotion.relatedHymnNumber}</span>
              </button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default DevotionsView;
