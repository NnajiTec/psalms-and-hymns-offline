import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Download,
  CheckCircle2,
  Search,
  Trash2,
  ChevronRight,
  GraduationCap,
  Newspaper,
  HardDrive,
  Check,
  HelpCircle,
} from 'lucide-react';
import type { Book, BibleStudySeries, MagazineIssue, DownloadedItem } from '../types/library';
import { freeBooks, bibleStudySeries, magazineIssues } from '../data/libraryData';
import { saveDownload, removeDownload, getAllDownloads } from '../services/db';

interface LibraryViewProps {
  onOpenBook: (book: Book) => void;
  onOpenStudy: (series: BibleStudySeries, lessonIndex: number) => void;
  onOpenArticle: (magazine: MagazineIssue, articleIndex: number) => void;
  onOpenScripture?: (ref: string) => void;
}

type LibrarySubTab = 'studies' | 'books' | 'magazines' | 'downloaded';

export const LibraryView: React.FC<LibraryViewProps> = ({
  onOpenBook,
  onOpenStudy,
  onOpenArticle,
  onOpenScripture,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<LibrarySubTab>('studies');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadedItems, setDownloadedItems] = useState<DownloadedItem[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Quiz state for Emmaus-style self-check
  const [activeQuizLessonId, setActiveQuizLessonId] = useState<string | null>(null);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Load downloaded items from IndexedDB
  const refreshDownloads = async () => {
    try {
      const items = await getAllDownloads();
      setDownloadedItems(items);
    } catch (e) {
      console.error('Error loading downloads:', e);
    }
  };

  useEffect(() => {
    refreshDownloads();
  }, []);

  const handleDownloadItem = async (
    id: string,
    title: string,
    author: string,
    type: 'book' | 'study' | 'magazine',
    size: string,
    data: any
  ) => {
    setDownloadingId(id);
    try {
      await saveDownload({
        id,
        itemType: type,
        title,
        author,
        downloadedAt: Date.now(),
        fileSize: size,
        data,
      });
      await refreshDownloads();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDeleteDownload = async (id: string) => {
    await removeDownload(id);
    await refreshDownloads();
  };

  const isDownloaded = (id: string) => downloadedItems.some((d) => d.id === id);

  // Filtered lists
  const filteredStudies = bibleStudySeries.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBooks = freeBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMagazines = magazineIssues.filter(
    (m) =>
      m.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.publicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.articles.some((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sample Emmaus self-check quiz question for active lesson
  const sampleQuiz = {
    question: 'According to Hebrews 10:25 and the Apostles\' practice in Acts 2:42, what is the central purpose of collective assembling on the Lord\'s Day?',
    options: [
      'Social entertainment and personal recreation',
      'The breaking of bread, remembrance of Christ, fellowship, and prayers',
      'Political organizing and secular community meetings',
      'Individual silent meditation without corporate gathering'
    ],
    correctIndex: 1,
    explanation: 'Acts 2:42 records that the disciples "continued stedfastly in the apostles\' doctrine and fellowship, and in breaking of bread, and in prayers."'
  };

  return (
    <div className="flex-1 h-full min-h-0 overflow-y-auto pb-36 pt-2 scroll-smooth app-bg touch-pan-y overscroll-contain">
      <div className="max-w-xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Module Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-main tracking-tight">
                Emmaus Study Courses & Library
              </h1>
              <p className="text-xs sm:text-sm text-dim">
                Systematic courses, doctrinal literature &amp; biblical studies
              </p>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-bold bg-[var(--accent-bg)] text-gold px-3 py-1 rounded-full border border-[var(--accent)]/30 font-sans">
              Biblical Studies &amp; Doctrine
            </span>
          </div>

          {/* Search Box */}
          <div className="relative mt-3">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, study topics, books, or articles..."
              className="w-full h-11 pl-10 pr-4 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-sm text-main placeholder:text-dim outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
            />
          </div>
        </div>

        {/* Content Hub Pill Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
          <button
            onClick={() => setActiveSubTab('studies')}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'studies'
                ? 'bg-[var(--accent)] text-white shadow-xs'
                : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main'
            }`}
          >
            <GraduationCap size={15} />
            <span>Study Courses ({bibleStudySeries.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('books')}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'books'
                ? 'bg-[var(--accent)] text-white shadow-xs'
                : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main'
            }`}
          >
            <BookOpen size={15} />
            <span>Doctrinal Books ({freeBooks.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('magazines')}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'magazines'
                ? 'bg-[var(--accent)] text-white shadow-xs'
                : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main'
            }`}
          >
            <Newspaper size={15} />
            <span>Needed Truth ({magazineIssues.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('downloaded')}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'downloaded'
                ? 'bg-[var(--accent)] text-white shadow-xs'
                : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-sub hover:text-main'
            }`}
          >
            <HardDrive size={15} />
            <span>Offline Saved ({downloadedItems.length})</span>
          </button>
        </div>

        {/* SUB-TAB 1: BIBLE STUDY COURSES (EMMAUS STYLE) */}
        {activeSubTab === 'studies' && (
          <div className="space-y-6">
            {filteredStudies.map((series) => (
              <div
                key={series.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs"
              >
                {/* Course Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300">
                        Course Series
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        By {series.author} • {series.targetAudience}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
                      {series.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {series.description}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleDownloadItem(
                        series.id,
                        series.title,
                        series.author,
                        'study',
                        '850 KB',
                        series
                      )
                    }
                    disabled={isDownloaded(series.id) || downloadingId === series.id}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isDownloaded(series.id)
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#0b406b] hover:text-white'
                    }`}
                  >
                    {isDownloaded(series.id) ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span>Saved Offline</span>
                      </>
                    ) : downloadingId === series.id ? (
                      <span>Downloading...</span>
                    ) : (
                      <>
                        <Download size={14} />
                        <span>Download Series</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Lessons List in Series */}
                <div className="mt-4 space-y-3">
                  {series.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#0b406b]/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-lg bg-[#0b406b] dark:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            {lesson.lessonNumber}
                          </span>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                            {lesson.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <strong className="text-slate-700 dark:text-slate-300">Aim:</strong> {lesson.aim}
                        </p>

                        {/* Scripture References Pills (1-tap open in Scripture Drawer!) */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold text-slate-400">Context:</span>
                          {lesson.scriptureReferences.map((ref) => (
                            <button
                              key={ref}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenScripture) onOpenScripture(ref);
                              }}
                              className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold hover:bg-emerald-500/20 transition-colors cursor-pointer"
                              title="Click to view full passage in Scripture Drawer"
                            >
                              {ref}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Emmaus Self-Check Quiz Trigger */}
                        <button
                          onClick={() => {
                            setActiveQuizLessonId(activeQuizLessonId === lesson.id ? null : lesson.id);
                            setQuizAnswerSelected(null);
                            setQuizSubmitted(false);
                          }}
                          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--accent-bg)] hover:bg-[var(--accent-bg)]/80 text-gold font-bold text-xs transition-all cursor-pointer"
                        >
                          <HelpCircle size={14} />
                          <span>Self-Check</span>
                        </button>

                        <button
                          onClick={() => onOpenStudy(series, idx)}
                          className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                        >
                          <span>Open Lesson</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Emmaus Interactive Self-Check Quiz Drawer (if expanded) */}
                {activeQuizLessonId && (
                  <div className="mt-4 p-5 rounded-2xl bg-[var(--accent-bg)]/20 border border-[var(--accent)]/30 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5 font-sans">
                        <CheckCircle2 size={15} className="text-gold" />
                        Emmaus Self-Check Review
                      </span>
                      <button
                        onClick={() => setActiveQuizLessonId(null)}
                        className="text-xs text-dim hover:text-main"
                      >
                        Close
                      </button>
                    </div>

                    <p className="text-sm font-serif font-bold text-main mb-3">
                      {sampleQuiz.question}
                    </p>

                    <div className="space-y-2 mb-3">
                      {sampleQuiz.options.map((opt, i) => (
                        <div
                          key={i}
                          onClick={() => !quizSubmitted && setQuizAnswerSelected(i)}
                          className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                            quizSubmitted
                              ? i === sampleQuiz.correctIndex
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                                : quizAnswerSelected === i
                                ? 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200'
                                : 'bg-white/40 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                              : quizAnswerSelected === i
                              ? 'bg-[var(--accent-bg)] border-[var(--accent)] text-gold font-bold'
                              : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-sub hover:border-[var(--accent)]/40'
                          }`}
                        >
                          <span className="mr-2 font-mono font-bold">{String.fromCharCode(65 + i)}.</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        disabled={quizAnswerSelected === null}
                        onClick={() => setQuizSubmitted(true)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                          quizAnswerSelected !== null
                            ? 'bg-[#0b406b] hover:bg-[#0c497a] text-white cursor-pointer'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Check My Answer
                      </button>
                    ) : (
                      <div className="text-xs p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200">
                        <strong>
                          {quizAnswerSelected === sampleQuiz.correctIndex ? '✓ Correct! ' : '✗ Review: '}
                        </strong>
                        {sampleQuiz.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SUB-TAB 2: DOCTRINAL BOOKS */}
        {activeSubTab === 'books' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-xs hover:border-[#0b406b] dark:hover:border-sky-500 transition-all hover:scale-[1.01]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300">
                      {book.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {book.pages} pages • {book.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    By {book.author}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {book.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() =>
                      handleDownloadItem(
                        book.id,
                        book.title,
                        book.author,
                        'book',
                        book.fileSize,
                        book
                      )
                    }
                    disabled={isDownloaded(book.id) || downloadingId === book.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isDownloaded(book.id)
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {isDownloaded(book.id) ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span>Offline</span>
                      </>
                    ) : downloadingId === book.id ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <Download size={14} />
                        <span>{book.fileSize}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenBook(book)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#0b406b] hover:bg-[#0c497a] text-white font-bold text-xs shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Read Book</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUB-TAB 3: NEEDED TRUTH PERIODICALS */}
        {activeSubTab === 'magazines' && (
          <div className="space-y-4">
            {filteredMagazines.map((issue) => (
              <div
                key={issue.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                    {issue.publicationName}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Vol. {issue.volume}, No. {issue.issue} • {issue.month} {issue.year}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mb-1">
                  Theme: {issue.theme}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {issue.articles.length} featured articles for biblical discipleship
                </p>

                <div className="space-y-2">
                  {issue.articles.map((art, artIdx) => (
                    <div
                      key={art.id}
                      onClick={() => onOpenArticle(issue, artIdx)}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-[#0b406b]/5 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer transition-colors group"
                    >
                      <div className="min-w-0 pr-2">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0b406b] dark:group-hover:text-sky-400 transition-colors truncate">
                          {art.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          By {art.author} {art.scriptureAnchor && `• ${art.scriptureAnchor}`}
                        </span>
                      </div>
                      <ChevronRight size={15} className="text-slate-400 group-hover:text-[#0b406b] shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUB-TAB 4: OFFLINE VAULT */}
        {activeSubTab === 'downloaded' && (
          <div>
            {downloadedItems.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <HardDrive size={36} className="mx-auto mb-3 text-slate-400 opacity-60" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  No literature saved to offline storage yet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Tap the download icon on any book or study course to save it to your device's IndexedDB for complete offline availability.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {downloadedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                          {item.itemType}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        By {item.author} • {item.fileSize}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.itemType === 'book') onOpenBook(item.data);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#0b406b] text-white font-bold text-xs hover:bg-[#0c497a] cursor-pointer"
                      >
                        Read
                      </button>
                      <button
                        onClick={() => handleDeleteDownload(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete from Offline Storage"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryView;
