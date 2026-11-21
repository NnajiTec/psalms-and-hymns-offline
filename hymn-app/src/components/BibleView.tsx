import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Search,
  Languages,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  Copy,
  Check,
  Download,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { BIBLE_BOOKS, type BibleBook } from '../data/bibleBooks';
import {
  BIBLE_VERSIONS,
  getChapterVerses,
  isVersionDownloaded,
  downloadTranslation,
  saveBibleBookmark,
  isVerseBookmarked,
  removeBibleBookmark,
  resolveBook,
} from '../services/bibleService';
import BibleNavigationModal from './BibleNavigationModal';
import BibleTranslationsModal from './BibleTranslationsModal';
import BibleSearchModal from './BibleSearchModal';
import type { AppSettings } from '../types/hymn';

interface BibleViewProps {
  settings: AppSettings;
  onOpenScriptureDrawer?: () => void;
}

export const BibleView: React.FC<BibleViewProps> = ({ settings }) => {
  const [currentBook, setCurrentBook] = useState<string>(() => {
    return localStorage.getItem('tbc_bible_book') || 'Romans';
  });
  const [currentChapter, setCurrentChapter] = useState<number>(() => {
    const saved = localStorage.getItem('tbc_bible_chapter');
    return saved ? parseInt(saved, 10) : 12;
  });
  const [currentVersion, setCurrentVersion] = useState<string>(() => {
    return localStorage.getItem('tbc_bible_version') || 'kjv';
  });
  const [targetVerse, setTargetVerse] = useState<number | null>(null);

  const [verses, setVerses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  // Modals
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isTranslationsOpen, setIsTranslationsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Active verse action sheet
  const [selectedVerseNum, setSelectedVerseNum] = useState<number | null>(null);
  const [verseIsBookmarked, setVerseIsBookmarked] = useState<boolean>(false);
  const [copiedVerse, setCopiedVerse] = useState<boolean>(false);

  // Font size local adjustment or inherit from settings
  const [fontScale, setFontScale] = useState<number>(() => {
    const s = localStorage.getItem('tbc_bible_font_scale');
    return s ? parseFloat(s) : 1.0;
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const currentBookObj: BibleBook =
    resolveBook(currentBook) ||
    BIBLE_BOOKS.find((b) => b.name === currentBook) ||
    BIBLE_BOOKS[0];

  const totalChapters = currentBookObj.chapters;
  const activeVersionObj =
    BIBLE_VERSIONS.find((v) => v.id === currentVersion) || BIBLE_VERSIONS[0];

  // Load chapter verses
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadChapter = async () => {
      try {
        const vList = await getChapterVerses(currentVersion, currentBook, currentChapter);
        if (isMounted) {
          setVerses(vList || []);
          setIsLoading(false);

          // Check if version is stored offline in IndexedDB
          const downloaded = await isVersionDownloaded(currentVersion);
          if (isMounted) setIsDownloaded(downloaded);

          // Scroll to top or to target verse
          if (targetVerse && verseRefs.current.has(targetVerse)) {
            setTimeout(() => {
              verseRefs.current.get(targetVerse)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          } else if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
          }
        }
      } catch (err) {
        console.error('[BibleView] Failed to load chapter:', err);
        if (isMounted) {
          setVerses([]);
          setIsLoading(false);
        }
      }
    };

    loadChapter();

    // Persist reading position
    localStorage.setItem('tbc_bible_book', currentBook);
    localStorage.setItem('tbc_bible_chapter', currentChapter.toString());
    localStorage.setItem('tbc_bible_version', currentVersion);

    return () => {
      isMounted = false;
    };
  }, [currentBook, currentChapter, currentVersion, targetVerse]);

  // Handle verse selection
  const handleVerseClick = async (verseNum: number) => {
    if (selectedVerseNum === verseNum) {
      setSelectedVerseNum(null);
      return;
    }
    setSelectedVerseNum(verseNum);
    setCopiedVerse(false);
    const bm = await isVerseBookmarked(currentBook, currentChapter, verseNum);
    setVerseIsBookmarked(bm);
  };

  const handleCopyVerse = () => {
    if (!selectedVerseNum || !verses[selectedVerseNum - 1]) return;
    const text = `${currentBook} ${currentChapter}:${selectedVerseNum} (${activeVersionObj.code})\n"${verses[selectedVerseNum - 1]}"`;
    navigator.clipboard.writeText(text);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  const handleToggleBookmarkVerse = async () => {
    if (!selectedVerseNum || !verses[selectedVerseNum - 1]) return;
    if (verseIsBookmarked) {
      await removeBibleBookmark(currentBook, currentChapter, selectedVerseNum);
      setVerseIsBookmarked(false);
    } else {
      await saveBibleBookmark({
        book: currentBook,
        chapter: currentChapter,
        verse: selectedVerseNum,
        text: verses[selectedVerseNum - 1],
        version: currentVersion,
      });
      setVerseIsBookmarked(true);
    }
  };

  const handleShareVerse = async () => {
    if (!selectedVerseNum || !verses[selectedVerseNum - 1]) return;
    const text = `${currentBook} ${currentChapter}:${selectedVerseNum} (${activeVersionObj.code})\n"${verses[selectedVerseNum - 1]}"\n\n— The Believer’s Companion`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentBook} ${currentChapter}:${selectedVerseNum}`,
          text: text,
        });
      } catch {
        // Fallback to copy
        handleCopyVerse();
      }
    } else {
      handleCopyVerse();
    }
  };

  // Chapter navigation
  const handlePrevChapter = () => {
    setSelectedVerseNum(null);
    setTargetVerse(null);
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else {
      // Previous book
      const prevIdx = currentBookObj.index - 1;
      if (prevIdx >= 0) {
        const prevBook = BIBLE_BOOKS[prevIdx];
        setCurrentBook(prevBook.name);
        setCurrentChapter(prevBook.chapters);
      }
    }
  };

  const handleNextChapter = () => {
    setSelectedVerseNum(null);
    setTargetVerse(null);
    if (currentChapter < totalChapters) {
      setCurrentChapter(currentChapter + 1);
    } else {
      // Next book
      const nextIdx = currentBookObj.index + 1;
      if (nextIdx < BIBLE_BOOKS.length) {
        const nextBook = BIBLE_BOOKS[nextIdx];
        setCurrentBook(nextBook.name);
        setCurrentChapter(1);
      }
    }
  };

  const isFirstChapter = currentBookObj.index === 0 && currentChapter === 1;
  const isLastChapter =
    currentBookObj.index === BIBLE_BOOKS.length - 1 && currentChapter === totalChapters;

  const handleDownloadActiveVersion = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);
    const success = await downloadTranslation(currentVersion, (pct) => {
      setDownloadProgress(pct);
    });
    setIsDownloading(false);
    if (success) {
      setIsDownloaded(true);
    }
  };

  const handleFontChange = (step: number) => {
    const newScale = Math.min(1.5, Math.max(0.85, Number((fontScale + step * 0.1).toFixed(2))));
    setFontScale(newScale);
    localStorage.setItem('tbc_bible_font_scale', newScale.toString());
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-main)] text-main overflow-hidden relative select-none">
      {/* Top Bible Toolbar */}
      <header
        className="sticky top-0 z-30 shrink-0 px-3 sm:px-6 flex items-center justify-between bg-[#182238] text-white shadow-md border-b border-white/10 select-none"
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 24px), 24px)',
          minHeight: 'calc(54px + max(env(safe-area-inset-top, 24px), 24px))',
        }}
      >
        {/* Navigation Dropdown Button: [Romans 12 ▼] */}
        <button
          type="button"
          onClick={() => setIsNavOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 transition-all cursor-pointer group"
          title="Open Bible Navigation Grid"
          aria-label="Navigate Bible books and chapters"
        >
          <Compass size={16} className="text-[#D98236] group-hover:rotate-45 transition-transform" />
          <span className="font-serif font-bold text-sm sm:text-base text-white tracking-wide">
            {currentBook} {currentChapter}
          </span>
          <span className="text-[10px] text-white/70">▼</span>
        </button>

        {/* Right Tools: Translation Pill, Search, Font Steppers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Active Translation Switcher */}
          <button
            type="button"
            onClick={() => setIsTranslationsOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white border border-white/15 transition-all cursor-pointer"
            title="Switch or download Bible translations"
            aria-label={`Translation: ${activeVersionObj.name}`}
          >
            <Languages size={13} className="text-[#D98236]" />
            <span>{activeVersionObj.code}</span>
          </button>

          {/* Scripture Search */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Search scripture"
            aria-label="Search scripture"
          >
            <Search size={18} />
          </button>

          {/* Font Steppers */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/15">
            <button
              type="button"
              onClick={() => handleFontChange(-1)}
              disabled={fontScale <= 0.85}
              className="px-2 py-1 rounded-full text-xs font-bold text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-serif transition-colors"
              title="Decrease text size"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <div className="w-px h-3 bg-white/20" />
            <button
              type="button"
              onClick={() => handleFontChange(1)}
              disabled={fontScale >= 1.5}
              className="px-2 py-1 rounded-full text-xs font-bold text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-serif transition-colors"
              title="Increase text size"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      {/* Offline Download Offer Banner (if version is not yet in IndexedDB) */}
      {!isDownloaded && !isLoading && (
        <div className="bg-[var(--accent-bg)] border-b border-[var(--border-color)] px-4 py-2 flex items-center justify-between text-xs text-gold">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="shrink-0" />
            <span>Save {activeVersionObj.name} for permanent offline reading</span>
          </div>
          {isDownloading ? (
            <div className="flex items-center gap-1.5 font-mono">
              <Loader2 size={13} className="animate-spin" />
              <span>{downloadProgress}%</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleDownloadActiveVersion}
              className="px-2.5 py-0.5 rounded-full bg-[var(--accent)] text-white text-[11px] font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1"
            >
              <Download size={12} />
              <span>Save ({activeVersionObj.size})</span>
            </button>
          )}
        </div>
      )}

      {/* Main Scripture Text Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-24 py-6 scrollbar-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Book & Chapter Header */}
        <div className="text-center mb-8 border-b border-[var(--border-color)] pb-6 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold tracking-widest uppercase text-dim block mb-1">
            {currentBookObj.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {activeVersionObj.code}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-main tracking-tight">
            {currentBook} {currentChapter}
          </h1>
          <p className="text-xs text-dim font-serif italic mt-1">
            {activeVersionObj.name}
          </p>
        </div>

        {/* Verses Content */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-dim text-xs gap-3">
            <Loader2 size={28} className="animate-spin text-gold" />
            <span className="font-serif">Opening {currentBook} {currentChapter}...</span>
          </div>
        ) : verses.length === 0 ? (
          <div className="py-16 text-center text-dim space-y-2 max-w-md mx-auto">
            <p className="text-sm font-semibold text-main">Passage not available</p>
            <p className="text-xs">
              Please check your translation or select another book/chapter.
            </p>
          </div>
        ) : (
          <div
            className={`max-w-2xl mx-auto space-y-3 leading-relaxed text-main transition-all select-text ${
              settings.fontFamily === 'sans' ? 'font-sans' : 'font-serif'
            }`}
            style={{ fontSize: `calc(1.05rem * ${fontScale})`, lineHeight: '1.8' }}
          >
            {verses.map((verseText, idx) => {
              const verseNum = idx + 1;
              const isSelected = selectedVerseNum === verseNum;
              const isTarget = targetVerse === verseNum;

              return (
                <div
                  key={verseNum}
                  ref={(el) => {
                    if (el) verseRefs.current.set(verseNum, el);
                    else verseRefs.current.delete(verseNum);
                  }}
                  onClick={() => handleVerseClick(verseNum)}
                  className={`p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[var(--accent-bg)] border border-[var(--accent)] shadow-xs'
                      : isTarget
                      ? 'bg-amber-400/15 border border-amber-400/40'
                      : 'hover:bg-[var(--bg-surface-alt)]/60 border border-transparent'
                  }`}
                >
                  <p className="inline">
                    <sup className="text-gold font-mono font-bold mr-1.5 text-[0.8em] select-none">
                      {verseNum}
                    </sup>
                    <span>{verseText}</span>
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Chapter Flipping Controls */}
        <div className="max-w-2xl mx-auto mt-10 pt-6 border-t border-[var(--border-color)] flex items-center justify-between gap-3 select-none">
          <button
            type="button"
            onClick={handlePrevChapter}
            disabled={isFirstChapter}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-sub hover:text-main disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-xs font-bold shadow-xs"
          >
            <ChevronLeft size={16} />
            <span>Prev Chapter</span>
          </button>

          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            className="text-xs font-serif font-bold text-gold hover:underline cursor-pointer"
          >
            {currentBook} {currentChapter}
          </button>

          <button
            type="button"
            onClick={handleNextChapter}
            disabled={isLastChapter}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-sub hover:text-main disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer text-xs font-bold shadow-xs"
          >
            <span>Next Chapter</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Essential Spacer to guarantee bottom navigation dock NEVER overlaps lyrics or scripture text! */}
        <div
          className="w-full shrink-0"
          style={{ height: 'calc(160px + env(safe-area-inset-bottom, 24px))' }}
          aria-hidden="true"
        />
      </div>

      {/* Floating Verse Action Sheet (When a verse is tapped) */}
      {selectedVerseNum && (
        <div
          className="fixed inset-x-0 z-40 flex justify-center px-4 select-none animate-slide-up"
          style={{ bottom: 'calc(76px + max(12px, env(safe-area-inset-bottom, 12px)))' }}
        >
          <div className="flex items-center gap-2 bg-[#182238] text-white border border-white/20 shadow-2xl rounded-full px-4 py-2 max-w-sm backdrop-blur-xl">
            <span className="text-xs font-serif font-bold text-amber-300 mr-1">
              v.{selectedVerseNum}
            </span>

            <button
              type="button"
              onClick={handleCopyVerse}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              title="Copy verse"
            >
              {copiedVerse ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedVerse ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleBookmarkVerse}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              title="Bookmark verse"
            >
              <Bookmark
                size={13}
                fill={verseIsBookmarked ? '#FFD54F' : 'none'}
                className={verseIsBookmarked ? 'text-[#FFD54F]' : 'text-white'}
              />
              <span>{verseIsBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareVerse}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Share verse"
            >
              <Share2 size={13} />
            </button>

            <button
              type="button"
              onClick={() => setSelectedVerseNum(null)}
              className="p-1 rounded-full hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer ml-1 text-xs"
              aria-label="Close action bar"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bible Navigation Modal */}
      <BibleNavigationModal
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        currentBook={currentBook}
        currentChapter={currentChapter}
        currentVerse={selectedVerseNum || 1}
        currentVersion={currentVersion}
        onSelectPassage={(b, ch, v) => {
          setCurrentBook(b);
          setCurrentChapter(ch);
          if (v) setTargetVerse(v);
          else setTargetVerse(null);
        }}
        onOpenTranslations={() => {
          setIsNavOpen(false);
          setIsTranslationsOpen(true);
        }}
      />

      {/* Bible Translations Modal */}
      <BibleTranslationsModal
        isOpen={isTranslationsOpen}
        onClose={() => setIsTranslationsOpen(false)}
        currentVersion={currentVersion}
        onSelectVersion={(vId) => {
          setCurrentVersion(vId);
          setIsTranslationsOpen(false);
        }}
      />

      {/* Bible Search Modal */}
      <BibleSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currentVersion={currentVersion}
        onSelectPassage={(b, ch, v) => {
          setCurrentBook(b);
          setCurrentChapter(ch);
          setTargetVerse(v);
        }}
      />
    </div>
  );
};

export default BibleView;
