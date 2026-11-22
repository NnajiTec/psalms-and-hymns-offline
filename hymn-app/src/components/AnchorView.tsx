import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Anchor,
  Search,
  BookOpen,
  Copy,
  Check,
  Share2,
  X,
  Columns,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { findScriptureByQuery, type ScripturePassage } from '../data/scriptureData';
import { bibleStudySeries } from '../data/libraryData';
import { BIBLE_BOOKS } from '../data/bibleBooks';
import {
  getChapterVerses,
  parseReference,
  resolveBook,
  BIBLE_VERSIONS,
} from '../services/bibleService';
import { ScriptureText } from './ScriptureText';
import { VersePreviewPopover } from './VersePreviewPopover';

interface AnchorViewProps {
  initialReference?: string | null;
  onOpenBibleVerse: (book: string, chapter: number, verse?: number) => void;
  onOpenHymnByNumber?: (hymnNumber: number) => void;
}

type AnchorMode = 'pillars' | 'courses';
type WindowLayout = 'split' | 'study' | 'bible';

export const AnchorView: React.FC<AnchorViewProps> = ({
  initialReference,
  onOpenBibleVerse,
}) => {
  // Navigation & View Modes
  const [activeMode, setActiveMode] = useState<AnchorMode>('pillars');
  const [windowLayout, setWindowLayout] = useState<WindowLayout>('split');

  // Study search & filters
  const [searchQuery, setSearchQuery] = useState(initialReference || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Active Emmaus Study Lesson
  const [activeSeriesId, setActiveSeriesId] = useState<string>(bibleStudySeries[0]?.id || '');
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);

  // Mobile Scripture Popover State (Screenshot matching)
  const [popoverReference, setPopoverReference] = useState<string | null>(null);

  // Right-hand Live Bible Reader State (Two-Window Desktop Mode)
  const [bibleBook, setBibleBook] = useState<string>('Psalms');
  const [bibleChapter, setBibleChapter] = useState<number>(33);
  const [bibleTargetVerse, setBibleTargetVerse] = useState<number | null>(11);
  const [bibleVersion, setBibleVersion] = useState<string>('kjv');
  const [bibleVerses, setBibleVerses] = useState<string[]>([]);
  const [isLoadingBible, setIsLoadingBible] = useState<boolean>(false);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);

  // Card Copy & Toast
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Refs
  const bibleScrollRef = useRef<HTMLDivElement>(null);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Detect wide screen vs mobile screen
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync initialReference prop if provided
  useEffect(() => {
    if (initialReference) {
      setSearchQuery(initialReference);
      setSelectedCategory('All');
      handleScriptureClick(initialReference);
    }
  }, [initialReference]);

  // Load right-hand Bible verses whenever book, chapter, or version changes
  useEffect(() => {
    let active = true;
    setIsLoadingBible(true);

    getChapterVerses(bibleVersion, bibleBook, bibleChapter)
      .then((res) => {
        if (active) {
          setBibleVerses(res || []);
          setIsLoadingBible(false);

          // Auto-scroll to target verse after render
          if (bibleTargetVerse) {
            setTimeout(() => {
              const el = verseRefs.current.get(bibleTargetVerse);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 120);
          } else if (bibleScrollRef.current) {
            bibleScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
          }
        }
      })
      .catch((err) => {
        console.error('[AnchorView] Bible load error:', err);
        if (active) setIsLoadingBible(false);
      });

    return () => {
      active = false;
    };
  }, [bibleBook, bibleChapter, bibleVersion, bibleTargetVerse]);

  // Click on any scripture link in teaching text
  const handleScriptureClick = (refString: string) => {
    const parsed = parseReference(refString);
    if (parsed && parsed.valid) {
      setBibleBook(parsed.book);
      setBibleChapter(parsed.chapter);
      setBibleTargetVerse(parsed.verse || 1);
    }

    // On mobile screens (< 1024px): show the floating popover card from the screenshot
    // On desktop screens (>= 1024px): right window automatically updates
    if (!isDesktop || windowLayout === 'study') {
      setPopoverReference(refString);
    }
  };

  const handleBibleNav = (delta: number) => {
    const bookObj = resolveBook(bibleBook) || BIBLE_BOOKS[0];
    const newChapter = bibleChapter + delta;
    if (newChapter >= 1 && newChapter <= bookObj.chapters) {
      setBibleChapter(newChapter);
      setBibleTargetVerse(null);
    }
  };

  const handleCopyPassage = (p: ScripturePassage) => {
    const text =
      `${p.reference} (${p.category} • ${p.theme})\n\n` +
      p.verses.map((v) => `${v.verse}. ${v.text}`).join('\n\n') +
      '\n\n— The Believer’s Companion (KJV)';
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    showToast(`Copied ${p.reference} to clipboard`);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleSharePassage = async (p: ScripturePassage) => {
    const text = `${p.reference}\n${p.theme}\n\n` + p.verses.map((v) => `${v.verse}. ${v.text}`).join('\n\n');
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Biblical Anchor: ${p.reference}`,
          text,
        });
      } catch {
        // Dismissed
      }
    } else {
      handleCopyPassage(p);
    }
  };

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  // Pillars Filter
  const categories = ['All', 'Worship', 'Doctrine', 'Church Order', 'Fellowship'];
  const filteredPassages = useMemo(() => {
    return findScriptureByQuery(searchQuery).filter(
      (p) => selectedCategory === 'All' || p.category === selectedCategory
    );
  }, [searchQuery, selectedCategory]);

  // Current Emmaus Study Lesson
  const currentSeries = bibleStudySeries.find((s) => s.id === activeSeriesId) || bibleStudySeries[0];
  const currentLesson = currentSeries?.lessons[activeLessonIdx] || currentSeries?.lessons[0];

  const bookObj = resolveBook(bibleBook) || BIBLE_BOOKS[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-main)] text-main overflow-hidden relative select-none">
      {/* Top Header Bar */}
      <header
        className="sticky top-0 z-20 shrink-0 px-3 sm:px-6 py-2.5 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between gap-2"
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 14px), 14px)',
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-gold shadow-xs shrink-0">
            <Anchor size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-serif font-bold text-main tracking-tight leading-tight truncate">
                Biblical Anchors &amp; Studies
              </h1>
            </div>
            <p className="text-[10.5px] sm:text-[11px] text-dim truncate font-sans">
              Dual-Window Study Workstation • Interactive Scripture Links
            </p>
          </div>
        </div>

        {/* Mode Switcher & Desktop Layout Toggles */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Mode Pill Toggle: Pillars vs Courses */}
          <div className="flex items-center p-0.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <button
              onClick={() => setActiveMode('pillars')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMode === 'pillars'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-sub hover:text-main'
              }`}
            >
              <Layers size={13} />
              <span className="hidden sm:inline">10 Pillars</span>
              <span className="sm:hidden">Pillars</span>
            </button>
            <button
              onClick={() => setActiveMode('courses')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeMode === 'courses'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-sub hover:text-main'
              }`}
            >
              <GraduationCap size={13} />
              <span className="hidden sm:inline">Bible Lessons</span>
              <span className="sm:hidden">Lessons</span>
            </button>
          </div>

          {/* Desktop Dual Window Layout Switcher */}
          {isDesktop && (
            <div className="hidden lg:flex items-center p-0.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] ml-1">
              <button
                onClick={() => setWindowLayout('split')}
                title="Split Screen (Two Windows: Study | Bible)"
                className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                  windowLayout === 'split'
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-sub hover:text-main'
                }`}
              >
                <Columns size={15} />
              </button>
              <button
                onClick={() => setWindowLayout('study')}
                title="Full Study View"
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  windowLayout === 'study'
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-sub hover:text-main'
                }`}
              >
                Study
              </button>
              <button
                onClick={() => setWindowLayout('bible')}
                title="Full Bible View"
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  windowLayout === 'bible'
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'text-sub hover:text-main'
                }`}
              >
                Bible
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Two-Window Body */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* ========================================================================= */}
        {/* WINDOW 1 (LEFT): STUDY TEACHINGS & ANCHORS                                 */}
        {/* ========================================================================= */}
        {(!isDesktop || windowLayout !== 'bible') && (
          <div
            className={`flex-1 flex flex-col h-full overflow-y-auto border-r border-[var(--border-color)] pb-28 sm:pb-32 px-3 sm:px-6 pt-3 space-y-4 ${
              isDesktop && windowLayout === 'split' ? 'w-1/2' : 'w-full'
            }`}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* MODE 1: 10 ASSEMBLY PILLARS */}
            {activeMode === 'pillars' && (
              <>
                {/* Search & Categories Bar */}
                <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-3 shadow-xs space-y-2.5">
                  <div className="relative flex items-center">
                    <Search size={15} className="absolute left-3 text-dim pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search anchors or scripture (e.g. Worship, Acts, Christ)..."
                      className="w-full h-9 pl-9 pr-8 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-xs sm:text-sm text-main placeholder:text-dim outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all font-sans"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 p-1 text-dim hover:text-main cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`shrink-0 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-amber-600 text-white shadow-xs font-bold'
                            : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-sub hover:text-main'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Passages List */}
                <div className="space-y-3.5">
                  {filteredPassages.map((p) => {
                    const isCopied = copiedId === p.id;
                    const isSelected =
                      bibleBook.toLowerCase() === p.book.toLowerCase() && bibleChapter === p.chapter;

                    return (
                      <article
                        key={p.id}
                        className={`rounded-2xl bg-[var(--bg-surface)] border p-4 shadow-xs transition-all ${
                          isSelected
                            ? 'border-amber-500 ring-1 ring-amber-500/30'
                            : 'border-[var(--border-color)] hover:border-amber-500/40'
                        }`}
                      >
                        {/* Passage Header */}
                        <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-[var(--border-color)]">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                type="button"
                                onClick={() => handleScriptureClick(p.reference)}
                                className="text-base sm:text-lg font-bold text-gold font-serif tracking-tight hover:underline cursor-pointer flex items-center gap-1"
                              >
                                <span>{p.reference}</span>
                              </button>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-gold border border-amber-500/30 font-sans">
                                {p.category}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-dim mt-0.5 font-sans">
                              {p.theme}
                            </p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleScriptureClick(p.reference)}
                              title="Display in Bible Window"
                              className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 transition-colors cursor-pointer"
                            >
                              <BookOpen size={13} />
                              <span className="font-sans">View</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyPassage(p)}
                              className="p-1.5 rounded-lg text-dim hover:text-main hover:bg-[var(--bg-surface-alt)] cursor-pointer"
                              title="Copy passage"
                            >
                              {isCopied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSharePassage(p)}
                              className="p-1.5 rounded-lg text-dim hover:text-main hover:bg-[var(--bg-surface-alt)] cursor-pointer"
                              title="Share passage"
                            >
                              <Share2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Verses Content with interactive scripture text */}
                        <div className="font-serif text-main text-sm leading-relaxed space-y-2 pl-3 border-l-2 border-amber-500/60 my-2.5">
                          {p.verses.map((v) => (
                            <div key={v.verse} className="flex gap-2 items-baseline">
                              <span className="font-sans font-bold text-xs text-gold/90 shrink-0 select-none">
                                {v.verse}
                              </span>
                              <ScriptureText
                                text={v.text}
                                onSelectScripture={handleScriptureClick}
                              />
                            </div>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}

            {/* MODE 2: EMMAUS BIBLE STUDY COURSES (God's Plan, Church Pattern, Person of Christ) */}
            {activeMode === 'courses' && currentLesson && (
              <div className="space-y-4">
                {/* Course & Lesson Selector Ribbon */}
                <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-3 shadow-xs space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-gold" />
                      <select
                        value={activeSeriesId}
                        onChange={(e) => {
                          setActiveSeriesId(e.target.value);
                          setActiveLessonIdx(0);
                        }}
                        className="text-xs font-bold bg-[var(--bg-surface-alt)] border border-[var(--border-color)] rounded-xl px-2.5 py-1 text-gold outline-none cursor-pointer"
                      >
                        {bibleStudySeries.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <span className="text-[11px] font-mono text-dim">
                      Lesson {currentLesson.lessonNumber} of {currentSeries.lessons.length}
                    </span>
                  </div>

                  {/* Lesson Selector Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                    {currentSeries.lessons.map((les, idx) => (
                      <button
                        key={les.id}
                        onClick={() => setActiveLessonIdx(idx)}
                        className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          activeLessonIdx === idx
                            ? 'bg-amber-600 text-white shadow-xs font-bold'
                            : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-sub hover:text-main'
                        }`}
                      >
                        Lesson {les.lessonNumber}: {les.title.slice(0, 24)}...
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lesson Reader Canvas matching Emmaus Bible screenshot */}
                <article className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 sm:p-7 shadow-xs space-y-5">
                  {/* Lesson Heading */}
                  <div className="border-b border-[var(--border-color)] pb-4">
                    <div className="flex items-center justify-between text-xs font-bold tracking-widest text-dim uppercase font-sans mb-1">
                      <span>LESSONS OVERVIEW</span>
                      <span className="text-gold">LESSON {currentLesson.lessonNumber}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-main tracking-tight leading-snug">
                      {currentLesson.title}
                    </h2>
                    <p className="text-xs font-sans text-dim mt-1">
                      Author: {currentSeries.author} • {currentSeries.targetAudience}
                    </p>
                  </div>

                  {/* Scripture Reference Tags (All clickable into Bible) */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gold font-sans mb-2">
                      Scripture References
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {currentLesson.scriptureReferences.map((ref) => (
                        <button
                          key={ref}
                          type="button"
                          onClick={() => handleScriptureClick(ref)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
                        >
                          <BookOpen size={12} />
                          <span>{ref}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aim of Study */}
                  <div className="p-3.5 rounded-2xl bg-[var(--accent-bg)]/20 border border-[var(--accent)]/30 text-xs sm:text-sm text-main font-sans">
                    <span className="font-bold text-gold uppercase tracking-wider block mb-1">
                      Aim of Study:
                    </span>
                    <ScriptureText
                      text={currentLesson.aim}
                      onSelectScripture={handleScriptureClick}
                    />
                  </div>

                  {/* Lesson Exposition with Interactive Scripture Links */}
                  <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-main whitespace-pre-line">
                    <ScriptureText
                      text={currentLesson.content}
                      onSelectScripture={handleScriptureClick}
                    />
                  </div>

                  {/* Discussion & Study Questions */}
                  {currentLesson.discussionQuestions && (
                    <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gold font-sans">
                        Discussion &amp; Reflection Questions
                      </h4>
                      <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-sub font-sans">
                        {currentLesson.discussionQuestions.map((q, i) => (
                          <li key={i}>
                            <ScriptureText
                              text={q}
                              onSelectScripture={handleScriptureClick}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </article>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* WINDOW 2 (RIGHT): LIVE HOLY BIBLE READER (EMBEDDED EMMAUS SIDE-BY-SIDE)    */}
        {/* ========================================================================= */}
        {isDesktop && windowLayout !== 'study' && (
          <div
            className={`flex-1 flex flex-col h-full bg-[var(--bg-surface)] overflow-hidden relative shadow-inner ${
              windowLayout === 'split' ? 'w-1/2' : 'w-full'
            }`}
          >
            {/* Window 2 Header: Book, Chapter, Version Selector & Actions */}
            <div className="shrink-0 px-4 py-2.5 bg-[#182238] text-white flex items-center justify-between border-b border-white/10 select-none shadow-xs">
              <div className="flex items-center gap-2">
                <BookOpen size={17} className="text-sky-400" />
                <span className="font-serif font-bold text-sm sm:text-base tracking-tight text-white">
                  {bookObj.name} {bibleChapter}
                </span>
                {bibleTargetVerse && (
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-gold border border-amber-500/30">
                    v. {bibleTargetVerse}
                  </span>
                )}
              </div>

              {/* Bible Navigation & Version Controls */}
              <div className="flex items-center gap-1.5">
                {/* Previous / Next Chapter */}
                <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/10">
                  <button
                    onClick={() => handleBibleNav(-1)}
                    disabled={bibleChapter <= 1}
                    className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Previous Chapter"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[11px] font-mono px-1.5">
                    {bibleChapter}/{bookObj.chapters}
                  </span>
                  <button
                    onClick={() => handleBibleNav(1)}
                    disabled={bibleChapter >= bookObj.chapters}
                    className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Next Chapter"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Translation Selector Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase transition-colors cursor-pointer border border-white/10"
                  >
                    <span>{bibleVersion.toUpperCase()}</span>
                    <ChevronDown size={13} />
                  </button>
                  {isVersionDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-[#182238] border border-white/15 rounded-xl shadow-2xl py-1 z-50">
                      {BIBLE_VERSIONS.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setBibleVersion(v.id);
                            setIsVersionDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/10 cursor-pointer ${
                            bibleVersion === v.id ? 'text-sky-400 font-bold' : 'text-white/80'
                          }`}
                        >
                          <span>{v.code} ({v.name})</span>
                          {bibleVersion === v.id && <Check size={13} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Maximize to full Bible Tab */}
                <button
                  type="button"
                  onClick={() => onOpenBibleVerse(bibleBook, bibleChapter, bibleTargetVerse || undefined)}
                  title="Expand to Full Bible Tab"
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 size={15} />
                </button>
              </div>
            </div>

            {/* Bible Verse Reader Canvas */}
            <div
              ref={bibleScrollRef}
              className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-3 font-serif text-main text-sm sm:text-base leading-relaxed"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {isLoadingBible ? (
                <div className="flex flex-col items-center justify-center py-20 text-dim space-y-2">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-sans">Loading {bookObj.name} {bibleChapter}...</p>
                </div>
              ) : bibleVerses.length > 0 ? (
                bibleVerses.map((verseText, idx) => {
                  const verseNum = idx + 1;
                  const isHighlighted = bibleTargetVerse === verseNum;

                  return (
                    <div
                      key={verseNum}
                      ref={(el) => {
                        if (el) verseRefs.current.set(verseNum, el);
                        else verseRefs.current.delete(verseNum);
                      }}
                      className={`flex gap-2.5 items-baseline p-2 rounded-xl transition-all ${
                        isHighlighted
                          ? 'bg-amber-500/15 border border-amber-500/30 text-gold font-medium ring-1 ring-amber-500/20'
                          : 'hover:bg-[var(--bg-surface-alt)]'
                      }`}
                    >
                      <span className="font-sans font-bold text-xs text-gold/80 shrink-0 select-none pt-0.5">
                        {verseNum}
                      </span>
                      <span className="select-text">{verseText}</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 text-dim text-xs">
                  No verses available for this chapter.
                </div>
              )}
            </div>

            {/* Bottom Bible Reader Status Bar */}
            <div className="shrink-0 px-4 py-2 bg-[var(--bg-header)] border-t border-[var(--border-color)] text-[11px] text-dim flex items-center justify-between font-sans">
              <span>{bookObj.name} {bibleChapter} • {bibleVerses.length} verses</span>
              <button
                type="button"
                onClick={() => onOpenBibleVerse(bibleBook, bibleChapter, bibleTargetVerse || undefined)}
                className="text-gold hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Full Reader</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE SCRIPTURE POPUP (EXACT EMMAUS BIBLE APP REPLICA FROM SCREENSHOT)    */}
      {/* ========================================================================= */}
      {popoverReference && (
        <VersePreviewPopover
          reference={popoverReference}
          versionId={bibleVersion}
          onClose={() => setPopoverReference(null)}
          onExpandToBible={(book, chapter, verse) => {
            setPopoverReference(null);
            onOpenBibleVerse(book, chapter, verse);
          }}
        />
      )}

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
