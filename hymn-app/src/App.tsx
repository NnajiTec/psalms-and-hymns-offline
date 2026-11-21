import React, { useState, useEffect } from 'react';
import type { Hymn, AppViewTab, AppSettings, ThemeMode } from './types/hymn';
import type { Book, BibleStudySeries, MagazineIssue } from './types/library';
import { getHymnByNumber } from './services/search';
import {
  loadSettings,
  saveSettings,
  loadFavorites,
  toggleFavorite,
  loadHistory,
  addToHistory,
  clearHistory,
} from './services/storage';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { NetworkStatusBanner } from './components/NetworkStatusBanner';
import { HymnViewer } from './components/HymnViewer';
import { BrowseView } from './components/BrowseView';
import { SearchView } from './components/SearchView';
import { FavoritesView } from './components/FavoritesView';
import { NumberPadModal } from './components/NumberPadModal';
import { TypographyDrawer } from './components/TypographyDrawer';
import { ScriptureDrawer } from './components/ScriptureDrawer';

import { LibraryView } from './components/LibraryView';
import { DevotionsView } from './components/DevotionsView';
import { BookstoreView } from './components/BookstoreView';
import { BookViewer } from './components/BookViewer';
import { SettingsView } from './components/SettingsView';
import { HomeDashboard } from './components/HomeDashboard';
import { BibleView } from './components/BibleView';

export const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [favorites, setFavorites] = useState<number[]>(loadFavorites);
  const [history, setHistory] = useState<number[]>(loadHistory);

  // Main navigation tab (default to clean Hymns view)
  const [currentMainTab, setCurrentMainTab] = useState<AppViewTab>('hymns');
  const [homeSubView, setHomeSubView] = useState<'dashboard' | 'all' | 'psalms'>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Active readers
  const [currentHymn, setCurrentHymn] = useState<Hymn | null>(null);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [returnHymnAfterSettings, setReturnHymnAfterSettings] = useState<Hymn | null>(null);

  // Modals & Drawers
  const [isDialOpen, setIsDialOpen] = useState(false);
  const [isTypographyOpen, setIsTypographyOpen] = useState(false);
  const [isScriptureDrawerOpen, setIsScriptureDrawerOpen] = useState(false);
  const [scriptureInitialRef, setScriptureInitialRef] = useState<string | null>(null);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [signModalData, setSignModalData] = useState<{ sign: string; meaning?: string } | null>(null);

  // Apply dark mode to documentElement (Tailwind CSS) & body (CSS variables)
  useEffect(() => {
    const isDark = settings.theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.body.className = `theme-${settings.theme}`;

    // Dynamically manage theme-color meta tag for mobile status bar
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }
    metaTheme.setAttribute('content', isDark ? '#111726' : '#F7F4ED');
  }, [settings.theme]);

  // Handle URL hash on initial load (e.g. #hymn-42, #settings, #search, #saved, #hymns)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('hymn-')) {
        const num = parseInt(hash.replace('hymn-', ''), 10);
        const h = getHymnByNumber(num);
        if (h) {
          setCurrentMainTab('hymns');
          setCurrentHymn(h);
          setCurrentBook(null);
          addToHistory(h.number);
          setHistory(loadHistory());
        }
      } else if (hash === 'settings') {
        setCurrentHymn(null);
        setCurrentBook(null);
        setCurrentMainTab('settings');
      } else if (hash === 'search') {
        setCurrentHymn(null);
        setCurrentBook(null);
        setCurrentMainTab('search');
      } else if (hash === 'saved') {
        setCurrentHymn(null);
        setCurrentBook(null);
        setCurrentMainTab('saved');
      } else if (hash === 'hymns' || hash === 'home' || hash === '') {
        setCurrentHymn(null);
        setCurrentBook(null);
        setCurrentMainTab('hymns');
        setHomeSubView('dashboard');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update URL hash when hymn changes
  const selectHymn = (hymn: Hymn) => {
    setCurrentHymn(hymn);
    setCurrentBook(null);
    window.location.hash = `#hymn-${hymn.number}`;
    addToHistory(hymn.number);
    setHistory(loadHistory());
  };

  const backToList = () => {
    setCurrentHymn(null);
    setCurrentBook(null);
    setIsPresentationMode(false);
    if (window.location.hash.startsWith('#hymn-')) {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.location.hash = '';
      }
    }
  };

  // Open book in reader
  const openBookInReader = (book: Book) => {
    setCurrentBook(book);
    setCurrentHymn(null);
  };

  const openStudyLesson = (series: BibleStudySeries, lessonIndex: number) => {
    const lesson = series.lessons[lessonIndex];
    if (!lesson) return;
    const bookObj: Book = {
      id: `${series.id}-${lesson.id}`,
      title: `${series.title}: Lesson ${lesson.lessonNumber}`,
      author: series.author,
      category: 'Doctrine',
      description: series.description,
      fileSize: 'Offline Study',
      isFree: true,
      coverColor: '#0b406b',
      chapters: [
        {
          id: lesson.id,
          title: lesson.title,
          content: `AIM OF STUDY:\n${lesson.aim}\n\nSCRIPTURE REFERENCES:\n${lesson.scriptureReferences.join('\n')}\n\nLESSON EXPOSITION:\n${lesson.content}\n\nDISCUSSION & STUDY QUESTIONS:\n${lesson.discussionQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`,
        },
      ],
    };
    openBookInReader(bookObj);
  };

  const openMagazineArticle = (issue: MagazineIssue, articleIndex: number) => {
    const art = issue.articles[articleIndex];
    if (!art) return;
    const bookObj: Book = {
      id: `${issue.id}-${art.id}`,
      title: art.title,
      author: art.author,
      category: 'Ministry',
      description: `${issue.publicationName} Vol. ${issue.volume}, No. ${issue.issue} (${issue.month} ${issue.year})`,
      fileSize: issue.fileSize,
      isFree: true,
      coverColor: '#0b406b',
      chapters: [
        {
          id: art.id,
          title: art.title,
          content: `${art.subtitle ? `${art.subtitle}\n\n` : ''}${art.scriptureAnchor ? `SCRIPTURE ANCHOR: ${art.scriptureAnchor}\n\n` : ''}${art.content}`,
        },
      ],
    };
    openBookInReader(bookObj);
  };

  const handleOpenScripture = (ref?: string) => {
    setScriptureInitialRef(ref || null);
    setIsScriptureDrawerOpen(true);
  };

  // Handle PWA install event
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'Escape') {
        if (isDialOpen) setIsDialOpen(false);
        else if (isTypographyOpen) setIsTypographyOpen(false);
        else if (isScriptureDrawerOpen) setIsScriptureDrawerOpen(false);
        else if (isPresentationMode) setIsPresentationMode(false);
        else if (currentHymn || currentBook) backToList();
      } else if (e.key === '#') {
        e.preventDefault();
        setIsDialOpen(true);
      } else if (e.key === '/') {
        e.preventDefault();
        backToList();
        setCurrentMainTab('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDialOpen, isTypographyOpen, isScriptureDrawerOpen, isPresentationMode, currentHymn, currentBook]);

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleToggleDarkMode = () => {
    const nextTheme: ThemeMode = settings.theme === 'light' ? 'dark' : 'light';
    handleUpdateSettings({ theme: nextTheme });
  };

  const handleToggleFavorite = (hymnId?: number) => {
    const targetId = hymnId ?? currentHymn?.number;
    if (!targetId) return;
    const updated = toggleFavorite(targetId);
    setFavorites(updated);
  };

  const handleQuickFontSize = (step: number) => {
    const sizes: AppSettings['fontSize'][] = ['sm', 'md', 'lg', 'xl', '2xl'];
    const idx = sizes.indexOf(settings.fontSize);
    const nextIdx = Math.max(0, Math.min(sizes.length - 1, idx + step));
    handleUpdateSettings({ fontSize: sizes[nextIdx] });
  };

  // Prev / Next hymns
  const prevHymn = currentHymn && currentHymn.number > 1 ? getHymnByNumber(currentHymn.number - 1) ?? null : null;
  const nextHymn = currentHymn && currentHymn.number < 500 ? getHymnByNumber(currentHymn.number + 1) ?? null : null;

  const handleShareCurrentHymn = async () => {
    if (!currentHymn) return;
    const isPsalm = currentHymn.number <= 25;
    const stanza1 = currentHymn.verses[0]?.lines.slice(0, 4).join('\n') || '';
    const text = `${isPsalm ? 'Psalm' : 'Hymn'} ${currentHymn.number}: ${currentHymn.title}\n\n"${stanza1}"\n\n— The Believer’s Companion`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${isPsalm ? 'Psalm' : 'Hymn'} ${currentHymn.number}: ${currentHymn.title}`,
          text: text,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      navigator.clipboard?.writeText(text);
    }
  };

  return (
    <div className="h-screen h-[100dvh] flex overflow-hidden app-bg text-main font-sans transition-colors duration-200">
      {/* Desktop & Mobile Slide-Over Emmaus Sidebar */}
      {!isPresentationMode && !currentHymn && !currentBook && (
        <Sidebar
          currentTab={currentMainTab}
          onSelectTab={(tab) => {
            backToList();
            setCurrentMainTab(tab);
            if (tab === 'hymns') setHomeSubView('dashboard');
          }}
          onOpenScriptureDrawer={() => handleOpenScripture()}
          onOpenDialPad={() => setIsDialOpen(true)}
          favoritesCount={favorites.length}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main View Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Offline/Online Network Status Alert Banner */}
        <NetworkStatusBanner />

        {/* Header - Shown on Reading Screen & Subviews without their own header */}
        {!isPresentationMode &&
          !currentBook &&
          (currentHymn ||
            (currentMainTab !== 'settings' &&
              currentMainTab !== 'hymns' &&
              currentMainTab !== 'bible' &&
              currentMainTab !== 'search')) && (
            <Header
              currentMainTab={currentMainTab}
              onSelectMainTab={(tab) => {
                backToList();
                setCurrentMainTab(tab);
                if (tab === 'hymns') setHomeSubView('dashboard');
              }}
              currentHymn={currentHymn}
              onOpenDial={() => setIsDialOpen(true)}
              onOpenTypography={() => {
                if (currentHymn) setReturnHymnAfterSettings(currentHymn);
                setCurrentHymn(null);
                setCurrentMainTab('settings');
              }}
              onOpenScriptureDrawer={() => handleOpenScripture()}
              isPresentationMode={isPresentationMode}
              onTogglePresentation={() => setIsPresentationMode(!isPresentationMode)}
              isFavorite={currentHymn ? favorites.includes(currentHymn.number) : false}
              onToggleFavorite={() => handleToggleFavorite()}
              onBackToList={backToList}
              onGoHome={() => {
                backToList();
                setCurrentMainTab('hymns');
                setHomeSubView('dashboard');
              }}
              onOpenSignModal={() => {
                if (currentHymn?.sign) {
                  setSignModalData({ sign: currentHymn.sign, meaning: currentHymn.signMeaning || '' });
                }
              }}
              settings={settings}
              onQuickFontSize={handleQuickFontSize}
              onToggleDarkMode={handleToggleDarkMode}
              onShare={handleShareCurrentHymn}
            />
          )}

        {/* Main Content Area */}
        <main className="flex-1 min-h-0 flex flex-col relative overflow-hidden">
          {/* If viewing a Book or Article */}
          {currentBook ? (
            <BookViewer
              book={currentBook}
              onBack={backToList}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
            />
          ) : currentHymn ? (
            /* If reading a Hymn (Screen 2 in Screenshot) */
            <HymnViewer
              hymn={currentHymn}
              prevHymn={prevHymn}
              nextHymn={nextHymn}
              onNavigate={selectHymn}
              isFavorite={favorites.includes(currentHymn.number)}
              onToggleFavorite={() => handleToggleFavorite()}
              settings={settings}
              onQuickFontSize={handleQuickFontSize}
              onToggleDarkMode={handleToggleDarkMode}
              onToggleLineSpacing={() => {
                const spacings: AppSettings['lineHeight'][] = ['normal', 'relaxed', 'loose'];
                const next = spacings[(spacings.indexOf(settings.lineHeight) + 1) % spacings.length];
                handleUpdateSettings({ lineHeight: next });
              }}
              onOpenSettings={() => {
                setReturnHymnAfterSettings(currentHymn);
                setCurrentHymn(null);
                setCurrentMainTab('settings');
              }}
              onBack={backToList}
              onGoHome={() => {
                backToList();
                setCurrentMainTab('hymns');
                setHomeSubView('dashboard');
              }}
              signModalData={signModalData}
              onOpenSignModal={(sign, meaning) => setSignModalData({ sign, meaning })}
              onCloseSignModal={() => setSignModalData(null)}
            />
          ) : (
            /* Main Views */
            <>
              {/* 1. Main Hymn Book / Library Dashboard (Screen 1 in Screenshot) */}
              {(currentMainTab === 'hymns' || currentMainTab === 'home') && (
                homeSubView === 'dashboard' ? (
                  <HomeDashboard
                    onSelectHymn={selectHymn}
                    onOpenAllHymns={(secId) => {
                      setHomeSubView(secId === 1 ? 'psalms' : 'all');
                    }}
                    onOpenPsalms={() => setHomeSubView('psalms')}
                    onOpenSaved={() => setCurrentMainTab('saved')}
                    onOpenSettings={() => setCurrentMainTab('settings')}
                    onOpenSearch={(query) => {
                      setSearchInitialQuery(query || '');
                      setCurrentMainTab('search');
                    }}
                    onOpenMenu={() => setIsMobileSidebarOpen(true)}
                    onOpenDial={() => setIsDialOpen(true)}
                    onOpenBible={() => {
                      backToList();
                      setCurrentMainTab('bible');
                    }}
                    recentHymnNumber={history[0] || 3}
                    recentHymnNumbers={history.slice(0, 2)}
                  />
                ) : (
                  <BrowseView
                    onSelectHymn={selectHymn}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDial={() => setIsDialOpen(true)}
                    onBackToHome={() => setHomeSubView('dashboard')}
                    initialSection={homeSubView === 'psalms' ? 1 : 'all'}
                  />
                )
              )}

              {/* 2. Holy Bible Reader (ShepherdPulse-Style Navigation Grid, 5 Offline Translations) */}
              {currentMainTab === 'bible' && (
                <BibleView
                  settings={settings}
                  onOpenScriptureDrawer={handleOpenScripture}
                />
              )}

              {/* 3. Unified Search Lyrics & A-Z Index */}
              {currentMainTab === 'search' && (
                <SearchView
                  onSelectHymn={selectHymn}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  initialQuery={searchInitialQuery}
                />
              )}

              {/* 4. Saved & Bookmarks */}
              {currentMainTab === 'saved' && (
                <FavoritesView
                  onSelectHymn={selectHymn}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  history={history}
                  onClearHistory={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  onOpenBibleVerse={(book, chapter) => {
                    localStorage.setItem('tbc_bible_book', book);
                    localStorage.setItem('tbc_bible_chapter', chapter.toString());
                    backToList();
                    setCurrentMainTab('bible');
                  }}
                />
              )}

              {/* 4. Daily Morning Manna Devotionals */}
              {currentMainTab === 'devotions' && (
                <DevotionsView
                  onOpenHymn={(hNum) => {
                    const h = getHymnByNumber(hNum);
                    if (h) selectHymn(h);
                  }}
                />
              )}

              {/* 5. Emmaus Study Courses & Library */}
              {currentMainTab === 'library' && (
                <LibraryView
                  onOpenBook={openBookInReader}
                  onOpenStudy={openStudyLesson}
                  onOpenArticle={openMagazineArticle}
                  onOpenScripture={handleOpenScripture}
                />
              )}

              {/* 6. Digital Bookstore */}
              {currentMainTab === 'bookstore' && (
                <BookstoreView onOpenBook={openBookInReader} />
              )}

              {/* 7. Settings View (Screen 3 in Screenshot) */}
              {currentMainTab === 'settings' && (
                <SettingsView
                  settings={settings}
                  onUpdateSettings={handleUpdateSettings}
                  onBack={() => {
                    if (returnHymnAfterSettings) {
                      const h = returnHymnAfterSettings;
                      setReturnHymnAfterSettings(null);
                      selectHymn(h);
                    } else {
                      backToList();
                      setCurrentMainTab('hymns');
                      setHomeSubView('dashboard');
                    }
                  }}
                  onGoHome={() => {
                    setReturnHymnAfterSettings(null);
                    backToList();
                    setCurrentMainTab('hymns');
                    setHomeSubView('dashboard');
                  }}
                />
              )}
            </>
          )}
        </main>

        {/* Mobile Floating Bottom Navigation - Hidden when reading hymn (matching Screen 2) */}
        {!currentBook && !isPresentationMode && !currentHymn && (
          <BottomNav
            currentTab={currentMainTab}
            onSelectTab={(tab) => {
              backToList();
              if (tab === 'home' || tab === 'hymns') {
                setCurrentMainTab('hymns');
                setHomeSubView('dashboard');
              } else {
                setCurrentMainTab(tab);
              }
            }}
            onOpenScripture={() => setIsScriptureDrawerOpen(true)}
            isScriptureOpen={isScriptureDrawerOpen}
          />
        )}
      </div>

      {/* Emmaus-style Slide-Over Scripture Cross-Reference Drawer */}
      <ScriptureDrawer
        isOpen={isScriptureDrawerOpen}
        onClose={() => setIsScriptureDrawerOpen(false)}
        initialReference={scriptureInitialRef}
        onOpenHymnByNumber={(hNum) => {
          const h = getHymnByNumber(hNum);
          if (h) {
            setIsScriptureDrawerOpen(false);
            selectHymn(h);
          }
        }}
      />

      {/* Keypad Jump Modal */}
      <NumberPadModal
        isOpen={isDialOpen}
        onClose={() => setIsDialOpen(false)}
        onSelectHymn={selectHymn}
      />

      {/* Floating Typography & Theme Drawer */}
      <TypographyDrawer
        isOpen={isTypographyOpen}
        onClose={() => setIsTypographyOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        canInstallPWA={!!deferredPrompt}
        onInstallPWA={handleInstallPWA}
      />
    </div>
  );
};

export default App;
