import React, { useState } from 'react';
import { X, Search, Compass, AlertCircle, ArrowLeft } from 'lucide-react';
import { BIBLE_BOOKS, type BibleBook } from '../data/bibleBooks';
import { parseReference, resolveBook, BIBLE_VERSIONS } from '../services/bibleService';

interface BibleNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBook: string;
  currentChapter: number;
  currentVerse?: number;
  currentVersion: string;
  onSelectPassage: (book: string, chapter: number, verse?: number) => void;
  onOpenTranslations: () => void;
}

type NavTab = 'book' | 'chapter' | 'verse';

export const BibleNavigationModal: React.FC<BibleNavigationModalProps> = ({
  isOpen,
  onClose,
  currentBook,
  currentChapter,
  currentVerse = 1,
  currentVersion,
  onSelectPassage,
  onOpenTranslations,
}) => {
  const [activeTab, setActiveTab] = useState<NavTab>('book');
  const [selectedBook, setSelectedBook] = useState<string>(currentBook || 'Romans');
  const [selectedChapter, setSelectedChapter] = useState<number>(currentChapter || 12);
  const [referenceInput, setReferenceInput] = useState<string>(`${currentBook} ${currentChapter}`);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentBookObj: BibleBook =
    resolveBook(selectedBook) ||
    BIBLE_BOOKS.find((b) => b.name === selectedBook) ||
    BIBLE_BOOKS[0];

  const totalChapters = currentBookObj.chapters;
  const safeChapter = Math.min(Math.max(1, selectedChapter), totalChapters);
  const totalVerses =
    (currentBookObj.chapterVerses && currentBookObj.chapterVerses[safeChapter - 1]) || 30;

  const otBooks = BIBLE_BOOKS.filter((b) => b.testament === 'OT');
  const ntBooks = BIBLE_BOOKS.filter((b) => b.testament === 'NT');

  const activeVersionObj =
    BIBLE_VERSIONS.find((v) => v.id === currentVersion) || BIBLE_VERSIONS[0];

  const handleGo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = referenceInput.trim();
    if (!clean) {
      setErrorMessage('Please enter a scripture reference, e.g. "Romans 12" or "John 3:16".');
      return;
    }

    const parsed = parseReference(clean);
    if (!parsed) {
      setErrorMessage(`Reference "${clean}" was not recognized. Please try "Romans 12" or "John 3:16".`);
      return;
    }

    if (!parsed.valid && parsed.error) {
      setErrorMessage(parsed.error);
      return;
    }

    setErrorMessage(null);
    onSelectPassage(parsed.book, parsed.chapter, parsed.verse);
    onClose();
  };

  const handleBookClick = (book: BibleBook) => {
    setSelectedBook(book.name);
    setSelectedChapter(1);
    setActiveTab('chapter');
    setReferenceInput(`${book.name} 1`);
    setErrorMessage(null);
  };

  const handleChapterClick = (ch: number) => {
    setSelectedChapter(ch);
    setActiveTab('verse');
    setReferenceInput(`${selectedBook} ${ch}`);
    setErrorMessage(null);
  };

  const handleVerseClick = (v: number) => {
    onSelectPassage(selectedBook, selectedChapter, v);
    onClose();
  };

  const handleReadWholeChapter = () => {
    onSelectPassage(selectedBook, selectedChapter, 1);
    onClose();
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
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center text-gold">
              <Compass size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-main tracking-tight leading-tight">
                Bible Navigation
              </h2>
              <p className="text-[11px] text-dim font-sans">
                Jump directly to any book, chapter or verse
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenTranslations}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gold bg-[var(--accent-bg)] border border-[var(--border-color)] hover:border-[var(--accent)] transition-all cursor-pointer"
              title="Change translation"
            >
              <span>{activeVersionObj.code}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Reference Input Form */}
        <div className="px-4 py-3 bg-[var(--bg-surface-alt)] border-b border-[var(--border-color)] shrink-0">
          <form onSubmit={handleGo} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim pointer-events-none" />
              <input
                type="text"
                value={referenceInput}
                onChange={(e) => {
                  setReferenceInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="E.g. Romans 12:1 or John 3:16"
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm text-main placeholder:text-dim font-sans outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-[var(--accent)] hover:opacity-95 active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              Go
            </button>
          </form>

          {/* Friendly Error Banner */}
          {errorMessage && (
            <div className="mt-2.5 p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-500 flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span className="flex-1">{errorMessage}</span>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="p-0.5 hover:opacity-75 cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Tabs: BOOK | CHAPTER | VERSE */}
        <div className="flex border-b border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-bold tracking-wider shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            className={`flex-1 py-2.5 text-center transition-all cursor-pointer border-b-2 ${
              activeTab === 'book'
                ? 'border-[var(--accent)] text-gold'
                : 'border-transparent text-dim hover:text-main'
            }`}
          >
            1. BOOK
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chapter')}
            className={`flex-1 py-2.5 text-center transition-all cursor-pointer border-b-2 ${
              activeTab === 'chapter'
                ? 'border-[var(--accent)] text-gold'
                : 'border-transparent text-dim hover:text-main'
            }`}
          >
            2. CHAPTER ({currentBookObj.navAbbrev})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('verse')}
            className={`flex-1 py-2.5 text-center transition-all cursor-pointer border-b-2 ${
              activeTab === 'verse'
                ? 'border-[var(--accent)] text-gold'
                : 'border-transparent text-dim hover:text-main'
            }`}
          >
            3. VERSE ({currentBookObj.navAbbrev} {safeChapter})
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-none max-h-[55vh]">
          {/* TAB 1: BOOK SELECTION */}
          {activeTab === 'book' && (
            <div className="space-y-4">
              {/* Old Testament */}
              <div>
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[var(--border-color)]">
                  <span className="text-[11px] font-bold text-dim uppercase tracking-wider">
                    Old Testament (39 Books)
                  </span>
                  <span className="text-[10px] text-dim">Genesis – Malachi</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                  {otBooks.map((b) => {
                    const isSelected = b.name === selectedBook;
                    return (
                      <button
                        key={b.index}
                        type="button"
                        onClick={() => handleBookClick(b)}
                        className={`p-2 rounded-xl text-center transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)] font-bold shadow-xs'
                            : 'bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)] hover:text-gold border-[var(--border-color)] text-main'
                        }`}
                        title={b.name}
                      >
                        <div className="text-xs font-mono font-bold">{b.navAbbrev}</div>
                        <div className="text-[9px] truncate opacity-80 mt-0.5">{b.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* New Testament */}
              <div>
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[var(--border-color)]">
                  <span className="text-[11px] font-bold text-dim uppercase tracking-wider">
                    New Testament (27 Books)
                  </span>
                  <span className="text-[10px] text-dim">Matthew – Revelation</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                  {ntBooks.map((b) => {
                    const isSelected = b.name === selectedBook;
                    return (
                      <button
                        key={b.index}
                        type="button"
                        onClick={() => handleBookClick(b)}
                        className={`p-2 rounded-xl text-center transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)] font-bold shadow-xs'
                            : 'bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)] hover:text-gold border-[var(--border-color)] text-main'
                        }`}
                        title={b.name}
                      >
                        <div className="text-xs font-mono font-bold">{b.navAbbrev}</div>
                        <div className="text-[9px] truncate opacity-80 mt-0.5">{b.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHAPTER SELECTION */}
          {activeTab === 'chapter' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setActiveTab('book')}
                  className="flex items-center gap-1 text-xs text-gold font-bold hover:underline cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Choose Book</span>
                </button>
                <span className="text-xs font-bold text-main">
                  {currentBookObj.name} ({totalChapters} chapters)
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 pt-1">
                {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => {
                  const isSelected = ch === safeChapter;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleChapterClick(ch)}
                      className={`h-11 rounded-xl flex items-center justify-center text-sm font-mono font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs'
                          : 'bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)] hover:text-gold border-[var(--border-color)] text-main'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: VERSE SELECTION */}
          {activeTab === 'verse' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setActiveTab('chapter')}
                  className="flex items-center gap-1 text-xs text-gold font-bold hover:underline cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Choose Chapter</span>
                </button>
                <button
                  type="button"
                  onClick={handleReadWholeChapter}
                  className="px-3 py-1 rounded-full bg-[var(--accent-bg)] text-gold text-xs font-bold border border-[var(--border-color)] hover:border-[var(--accent)] transition-all cursor-pointer"
                >
                  Read Whole Chapter
                </button>
              </div>

              <div className="text-xs font-semibold text-dim pb-1">
                Select starting verse in {currentBookObj.name} {safeChapter}:
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                {Array.from({ length: totalVerses }, (_, i) => i + 1).map((v) => {
                  const isCurrent = v === currentVerse;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleVerseClick(v)}
                      className={`h-11 rounded-xl flex items-center justify-center text-sm font-mono font-bold transition-all cursor-pointer border ${
                        isCurrent
                          ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs'
                          : 'bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)] hover:text-gold border-[var(--border-color)] text-main'
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BibleNavigationModal;
