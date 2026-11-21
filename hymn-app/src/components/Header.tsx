import React from 'react';
import {
  Hash,
  Sun,
  Moon,
  Sliders,
  Bookmark,
  ArrowLeft,
  Share2,
  Home,
} from 'lucide-react';
import type { Hymn, AppViewTab, AppSettings } from '../types/hymn';
import appLogo from '../assets/app-icon.png';

interface HeaderProps {
  currentMainTab: AppViewTab;
  onSelectMainTab: (tab: AppViewTab) => void;
  currentHymn: Hymn | null;
  onOpenDial: () => void;
  onOpenTypography: () => void;
  onOpenScriptureDrawer: () => void;
  isPresentationMode: boolean;
  onTogglePresentation: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBackToList: () => void;
  onGoHome?: () => void;
  onOpenSignModal?: () => void;
  settings: AppSettings;
  onQuickFontSize?: (step: number) => void;
  onToggleDarkMode: () => void;
  onShare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMainTab,
  onSelectMainTab,
  currentHymn,
  onOpenDial,
  onOpenTypography,
  isFavorite,
  onToggleFavorite,
  onBackToList,
  onGoHome,
  onOpenSignModal,
  settings,
  onQuickFontSize,
  onToggleDarkMode,
  onShare,
}) => {
  const getHeaderTitle = () => {
    switch (currentMainTab) {
      case 'hymns':
      case 'home':
        return 'The Believer’s Companion';
      case 'bible':
        return 'Holy Bible';
      case 'search':
        return 'A–Z Index';
      case 'saved':
        return 'Saved Hymns';
      case 'devotions':
        return 'Morning Manna';
      case 'library':
        return 'Study Library';
      default:
        return 'The Believer’s Companion';
    }
  };

  const isDark = settings.theme === 'dark';
  const currentTheme = isDark
    ? { icon: <Sun size={17} className="text-[#D98236]" />, label: 'Switch to Warm Ivory' }
    : { icon: <Moon size={17} className="text-[#B56B2B]" />, label: 'Switch to Midnight Navy' };

  // Reading Screen Header (Deep Navy, White text, Back, Home, Hymn {n}, Font Steppers, Bookmark, Share)
  if (currentHymn) {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl'];
    const currentSizeIdx = sizes.indexOf(settings.fontSize);

    return (
      <header
        className="sticky top-0 z-40 shrink-0 px-3 sm:px-6 flex items-center justify-between bg-[#182238] text-white shadow-md border-b border-white/10 transition-colors select-none"
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 24px), 24px)',
          minHeight: 'calc(54px + max(env(safe-area-inset-top, 24px), 24px))',
        }}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {/* Back button */}
          <button
            onClick={onBackToList}
            className="p-2 -ml-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Back to hymn list"
            aria-label="Back to hymns"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Explicit Home Button */}
          <button
            onClick={onGoHome || onBackToList}
            className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Return to Home Dashboard"
            aria-label="Return to Home"
          >
            <Home size={19} />
          </button>

          {/* Hymn Number & Special Sign */}
          <div className="flex items-center gap-1.5 truncate">
            <h1 className="font-serif font-bold text-base sm:text-lg text-white tracking-wide truncate">
              {currentHymn.number <= 25 ? `Psalm ${currentHymn.number}` : `Hymn ${currentHymn.number}`}
            </h1>
            {currentHymn.sign && (
              <button
                type="button"
                onClick={onOpenSignModal}
                className="px-1.5 py-0.5 rounded-md bg-amber-400/20 hover:bg-amber-400/35 active:scale-95 text-amber-300 border border-amber-300/40 text-xs font-mono font-bold shrink-0 cursor-pointer transition-all"
                title="Tap to see the meaning of this sign"
                aria-label={`Special sign ${currentHymn.sign}. Tap to view meaning`}
              >
                {currentHymn.sign}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Direct Font Steppers: A- (Decrease) and A+ (Increase) */}
          {onQuickFontSize && (
            <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/15">
              <button
                type="button"
                onClick={() => onQuickFontSize(-1)}
                disabled={currentSizeIdx <= 0}
                className="px-2 py-1 rounded-full text-xs font-bold text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-serif transition-colors"
                title="Decrease font size (A-)"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <div className="w-px h-3 bg-white/20" />
              <button
                type="button"
                onClick={() => onQuickFontSize(1)}
                disabled={currentSizeIdx >= sizes.length - 1}
                className="px-2 py-1 rounded-full text-xs font-bold text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-serif transition-colors"
                title="Increase font size (A+)"
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>
          )}

          {/* Bookmark */}
          <button
            onClick={onToggleFavorite}
            className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={isFavorite ? 'Remove Bookmark' : 'Bookmark this hymn'}
            aria-label={isFavorite ? 'Remove Bookmark' : 'Bookmark this hymn'}
          >
            <Bookmark
              size={18}
              fill={isFavorite ? '#FFD54F' : 'none'}
              strokeWidth={isFavorite ? 2.5 : 2}
              className={isFavorite ? 'text-[#FFD54F]' : 'text-white'}
            />
          </button>

          {/* Share */}
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Share hymn"
              aria-label="Share hymn"
            >
              <Share2 size={18} className="text-white" />
            </button>
          )}
        </div>
      </header>
    );
  }

  // Main Header (when browsing other tabs)
  return (
    <header
      className="sticky top-0 z-40 shrink-0 px-4 sm:px-6 flex items-center justify-between bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-color)] transition-colors select-none"
      style={{
        paddingTop: 'max(env(safe-area-inset-top, 24px), 24px)',
        minHeight: 'calc(56px + max(env(safe-area-inset-top, 24px), 24px))',
      }}
    >
      {/* Left section: Logo and Brand / Back button */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={() => onSelectMainTab('hymns')}
          className="flex items-center gap-2.5 text-left cursor-pointer group focus:outline-hidden"
        >
          <img
            src={appLogo}
            alt="Psalms and Hymns Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover shadow-xs border border-[var(--border-subtle)]"
          />
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-serif font-semibold text-main tracking-tight leading-tight group-hover:text-[var(--accent)] transition-colors">
              {getHeaderTitle()}
            </h1>
          </div>
        </button>
      </div>

      {/* Right section: Actions & Utilities */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Dial Button (when browsing hymn book) */}
        <button
          onClick={onOpenDial}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-sub hover:text-main hover:border-[var(--accent)] text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs"
          title="Dial Hymn Number (1–500)"
          aria-label="Dial Hymn Number"
        >
          <Hash size={13} className="text-[var(--accent)]" />
          <span className="font-mono">Dial</span>
        </button>

        {/* Theme Mode Cycle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-full border border-transparent hover:border-[var(--border-color)] text-sub hover:text-main transition-all cursor-pointer"
          title={`Theme: ${currentTheme.label}`}
          aria-label="Toggle theme appearance"
        >
          {currentTheme.icon}
        </button>

        {/* Typography & Settings */}
        <button
          onClick={onOpenTypography}
          className="p-2 rounded-full border border-transparent hover:border-[var(--border-color)] text-sub hover:text-main transition-all cursor-pointer"
          title="Reader & Typography Settings"
          aria-label="Open Reader and Typography settings"
        >
          <Sliders size={17} />
        </button>
      </div>
    </header>
  );
};

export default Header;
