import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, ArrowLeft, Copy, Check } from 'lucide-react';
import type { AppSettings } from '../types/hymn';
import type { Book, Chapter } from '../types/library';
import { ScriptureText } from './ScriptureText';
import { VersePreviewPopover } from './VersePreviewPopover';

interface BookViewerProps {
  book: Book;
  initialChapterId?: string;
  onBack: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  isDownloaded?: boolean;
  onToggleDownload?: () => void;
  onOpenBibleVerse?: (book: string, chapter: number, verse?: number) => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  book,
  initialChapterId,
  onBack,
  settings,
  onUpdateSettings,
  isDownloaded,
  onToggleDownload,
  onOpenBibleVerse,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(() => {
    if (!initialChapterId) return 0;
    const idx = book.chapters.findIndex((c) => c.id === initialChapterId);
    return idx >= 0 ? idx : 0;
  });

  const [copied, setCopied] = useState(false);
  const [popoverReference, setPopoverReference] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentChapter: Chapter | undefined = book.chapters[activeChapterIndex] || book.chapters[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeChapterIndex]);

  const handleQuickFontSize = (step: number) => {
    const sizes: AppSettings['fontSize'][] = ['sm', 'md', 'lg', 'xl', '2xl'];
    const idx = sizes.indexOf(settings.fontSize);
    const nextIdx = Math.max(0, Math.min(sizes.length - 1, idx + step));
    onUpdateSettings({ fontSize: sizes[nextIdx] });
  };

  const handleCopy = () => {
    if (!currentChapter) return;
    const text = `${book.title} - ${currentChapter.title}\nBy ${book.author}\n\n${currentChapter.content}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prevChapter = activeChapterIndex > 0 ? book.chapters[activeChapterIndex - 1] : null;
  const nextChapter = activeChapterIndex < book.chapters.length - 1 ? book.chapters[activeChapterIndex + 1] : null;

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 app-bg text-main font-sans">
      {/* Top Reading Navigation Bar */}
      <header className="sticky top-0 z-40 h-16 px-4 sm:px-6 flex items-center justify-between bg-header backdrop-blur-md border-b border-theme-subtle shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl surface-card text-main font-bold text-xs transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={16} className="text-gold" />
          <span>Library</span>
        </button>

        <div className="text-center max-w-[50%] min-w-0">
          <div className="text-xs sm:text-sm font-serif font-bold text-main truncate">
            {book.title}
          </div>
          <div className="text-[10px] text-dim">
            Chapter {activeChapterIndex + 1} of {book.chapters.length}
          </div>
        </div>

        {/* Quick Reader Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {onToggleDownload && (
            <button
              onClick={onToggleDownload}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isDownloaded
                  ? 'text-gold bg-[var(--accent-bg)] border border-[var(--accent)]/30'
                  : 'text-dim hover:text-main hover:bg-[var(--bg-surface-alt)]'
              }`}
              title={isDownloaded ? 'Saved offline' : 'Save for offline reading'}
            >
              <Bookmark size={16} fill={isDownloaded ? 'currentColor' : 'none'} />
            </button>
          )}

          <div className="flex items-center rounded-xl surface-card p-0.5">
            <button
              onClick={() => handleQuickFontSize(-1)}
              className="px-2 py-1 rounded-lg text-xs font-bold text-dim hover:text-main hover:bg-surface-alt transition-colors cursor-pointer"
              title="Smaller font"
            >
              A-
            </button>
            <button
              onClick={() => handleQuickFontSize(1)}
              className="px-2 py-1 rounded-lg text-xs font-bold text-dim hover:text-main hover:bg-surface-alt transition-colors cursor-pointer"
              title="Larger font"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <main
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto pb-36 pt-6 scroll-smooth select-text touch-pan-y overscroll-contain"
      >
        <div className="max-w-2xl mx-auto px-5 sm:px-8 animate-fade-in">
          {/* Book / Chapter Header */}
          <div className="mb-6 pb-4 border-b border-theme-subtle">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--accent-bg)] text-gold border border-[var(--accent)]/30 mb-2 font-sans">
              {book.category} • {book.author}
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-main tracking-tight leading-snug mb-1">
              {currentChapter ? currentChapter.title : book.title}
            </h1>
            <p className="text-xs text-dim">
              Published {book.year || 'Historic'} • {book.fileSize}
            </p>
          </div>

          {/* Body Content */}
          <div
            className={`font-serif text-main leading-relaxed whitespace-pre-line ${
              settings.fontSize === 'sm'
                ? 'text-sm sm:text-base leading-relaxed'
                : settings.fontSize === 'md'
                ? 'text-base sm:text-lg leading-relaxed'
                : settings.fontSize === 'lg'
                ? 'text-lg sm:text-xl leading-relaxed'
                : settings.fontSize === 'xl'
                ? 'text-xl sm:text-2xl leading-relaxed'
                : 'text-2xl sm:text-3xl leading-relaxed'
            }`}
            style={{
              lineHeight:
                settings.lineHeight === 'loose'
                  ? '2.1'
                  : settings.lineHeight === 'relaxed'
                  ? '1.85'
                  : '1.65',
            }}
          >
            {currentChapter?.content ? (
              <ScriptureText
                text={currentChapter.content}
                onSelectScripture={(ref) => setPopoverReference(ref)}
              />
            ) : null}
          </div>
        </div>
      </main>

      {/* Floating Scripture Preview Popover (matching Emmaus Bible mobile screenshot) */}
      {popoverReference && (
        <VersePreviewPopover
          reference={popoverReference}
          onClose={() => setPopoverReference(null)}
          onExpandToBible={(bookName, ch, v) => {
            setPopoverReference(null);
            if (onOpenBibleVerse) {
              onOpenBibleVerse(bookName, ch, v);
            }
          }}
        />
      )}

      {/* Floating Bottom Navigation Controller */}
      <footer className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4 select-none">
        <div className="pointer-events-auto floating-dock backdrop-blur-xl flex items-center justify-between gap-2 px-4 py-2 rounded-full max-w-md w-full transition-all">
          <button
            onClick={() => prevChapter && setActiveChapterIndex(activeChapterIndex - 1)}
            disabled={!prevChapter}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              prevChapter
                ? 'text-main hover:text-gold hover:scale-105 active:scale-95'
                : 'text-dim opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl text-dim hover:text-main hover:bg-surface-alt transition-colors cursor-pointer"
            title="Copy Chapter"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>

          <button
            onClick={() => nextChapter && setActiveChapterIndex(activeChapterIndex + 1)}
            disabled={!nextChapter}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              nextChapter
                ? 'text-main hover:text-gold hover:scale-105 active:scale-95'
                : 'text-dim opacity-30 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BookViewer;
