import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Bookmark,
  Share2,
  Check,
  Music,
  Volume2,
  X,
  AlignLeft,
  Palette,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Settings,
  Home,
  HelpCircle,
} from 'lucide-react';
import type { Hymn, AppSettings } from '../types/hymn';
import { parseMeterAndTune, getHymnByNumber } from '../services/search';
import { formatHymnTitle } from './HomeDashboard';
import { SignMeaningModal } from './SignMeaningModal';

interface HymnViewerProps {
  hymn: Hymn;
  prevHymn: Hymn | null;
  nextHymn: Hymn | null;
  onNavigate: (hymn: Hymn) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  settings: AppSettings;
  onQuickFontSize: (step: number) => void;
  onToggleDarkMode?: () => void;
  onToggleLineSpacing?: () => void;
  onOpenSettings?: () => void;
  onBack?: () => void;
  onGoHome?: () => void;
  signModalData?: { sign: string; meaning?: string } | null;
  onOpenSignModal?: (sign: string, meaning?: string) => void;
  onCloseSignModal?: () => void;
}

export const HymnViewer: React.FC<HymnViewerProps> = ({
  hymn,
  prevHymn,
  nextHymn,
  onNavigate,
  isFavorite,
  onToggleFavorite,
  settings,
  onQuickFontSize,
  onToggleDarkMode,
  onToggleLineSpacing,
  onOpenSettings,
  onBack,
  onGoHome,
  signModalData: externalSignModalData,
  onOpenSignModal,
  onCloseSignModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isPlayingPitch, setIsPlayingPitch] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Local Sign Meaning Modal State (fallback if not controlled externally)
  const [localSignModalData, setLocalSignModalData] = useState<{ sign: string; meaning?: string } | null>(null);

  const activeSignModal = externalSignModalData !== undefined ? externalSignModalData : localSignModalData;
  const handleOpenSign = (sign: string, meaning?: string) => {
    if (onOpenSignModal) {
      onOpenSignModal(sign, meaning);
    } else {
      setLocalSignModalData({ sign, meaning });
    }
  };
  const handleCloseSign = () => {
    if (onCloseSignModal) {
      onCloseSignModal();
    } else {
      setLocalSignModalData(null);
    }
  };

  // Direct Hymn-Number Selection State
  const [isJumpDialogOpen, setIsJumpDialogOpen] = useState(false);
  const [jumpInput, setJumpInput] = useState('');
  const [jumpError, setJumpError] = useState<string | null>(null);
  const jumpInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top on hymn change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [hymn.number]);

  // Keep screen awake
  useEffect(() => {
    let wakeLock: any = null;
    const requestWakeLock = async () => {
      if (settings.keepScreenAwake && 'wakeLock' in navigator) {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        } catch {
          // ignore
        }
      }
    };
    requestWakeLock();
    return () => {
      if (wakeLock) wakeLock.release().catch(() => {});
    };
  }, [settings.keepScreenAwake]);

  // Auto-focus input and lock body scroll when Jump Dialog opens
  useEffect(() => {
    if (isJumpDialogOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        jumpInputRef.current?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isJumpDialogOpen]);

  const openJumpDialog = () => {
    setJumpInput('');
    setJumpError(null);
    setIsJumpDialogOpen(true);
  };

  // Swipe gesture for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 60 && nextHymn) {
      onNavigate(nextHymn);
    } else if (diff < -60 && prevHymn) {
      onNavigate(prevHymn);
    }
    setTouchStart(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && nextHymn) onNavigate(nextHymn);
      else if (e.key === 'ArrowLeft' && prevHymn) onNavigate(prevHymn);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevHymn, nextHymn, onNavigate]);

  // Anti-Scraping / Anti-Copy Guard: Prevent copying full hymn text
  useEffect(() => {
    const handleDocumentCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (
        containerRef.current &&
        selection &&
        selection.anchorNode &&
        containerRef.current.contains(selection.anchorNode)
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('copy', handleDocumentCopy);
    return () => {
      document.removeEventListener('copy', handleDocumentCopy);
    };
  }, []);

  // Intellectual Property & Anti-Scraping: Restrict sharing to a brief 1-stanza citation with attribution
  const handleShare = async () => {
    const isPsalm = hymn.number <= 25;
    const stanza1 = hymn.verses[0]?.lines.slice(0, 4).join('\n') || '';
    const text = `${isPsalm ? 'Psalm' : 'Hymn'} ${hymn.number}: ${hymn.title}\n\n"${stanza1}"\n\n— The Believer’s Companion`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${isPsalm ? 'Psalm' : 'Hymn'} ${hymn.number}: ${hymn.title}`,
          text: text,
          url: window.location.href,
        });
        return;
      } catch {
        // Share cancelled or unavailable
      }
    }
    // Fallback: Copy only the brief 1-stanza citation, never the complete hymn
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handlePlayPitch = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      setIsPlayingPitch(true);
      osc.stop(ctx.currentTime + 2.6);
      setTimeout(() => {
        setIsPlayingPitch(false);
        ctx.close();
      }, 2600);
    } catch (e) {
      console.warn('Audio pitch error:', e);
    }
  };

  // Direct Jump Handlers & Live Validation
  const trimmedJump = jumpInput.trim();
  const isDigits = /^\d+$/.test(trimmedJump);
  const parsedJumpNum = isDigits ? parseInt(trimmedJump, 10) : NaN;
  const targetHymnPreview =
    !isNaN(parsedJumpNum) && parsedJumpNum >= 1 && parsedJumpNum <= 500
      ? getHymnByNumber(parsedJumpNum)
      : null;

  const handleConfirmJump = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = jumpInput.trim();
    if (!trimmed) {
      setJumpError('Please enter a hymn number.');
      return;
    }
    if (!/^\d+$/.test(trimmed)) {
      setJumpError('Please enter digits only (1 to 500).');
      return;
    }
    const num = parseInt(trimmed, 10);
    if (num < 1 || num > 500) {
      setJumpError('Please enter a valid number between 1 and 500.');
      return;
    }
    const target = getHymnByNumber(num);
    if (!target) {
      setJumpError(`Hymn #${num} was not found.`);
      return;
    }
    setIsJumpDialogOpen(false);
    setJumpInput('');
    setJumpError(null);
    onNavigate(target);
  };

  const parsed = parseMeterAndTune(hymn.meter);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onCopy={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      className="flex-1 w-full min-h-0 overflow-y-auto pt-3 sm:pt-5 relative scroll-smooth app-bg select-none hymn-lyrics-protected"
      style={{ WebkitOverflowScrolling: 'touch', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 animate-fade-in">
        {/* STATELY SACRED HYMN TITLE SECTION (Unboxed, Authentic Printed Hymnal Style) */}
        <div className="pt-2 pb-6 px-2 text-center select-none">
          {/* Subtle Liturgical Category & Verse Count */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-[var(--accent)] uppercase mb-1">
            <span>{hymn.number <= 25 ? 'Metrical Psalms' : `Section ${hymn.sectionId || 1}`}</span>
            <span>•</span>
            <span>{hymn.verseCount} Verses</span>
          </div>

          {/* Stately Hymn Title in Lora Serif */}
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-main leading-tight tracking-tight max-w-lg mx-auto mb-2 flex items-center justify-center gap-2 flex-wrap">
            <span>{formatHymnTitle(hymn.title)}</span>
            {hymn.sign && (
              <button
                type="button"
                onClick={() => handleOpenSign(hymn.sign!, hymn.signMeaning)}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 active:scale-95 text-amber-700 dark:text-amber-300 border border-amber-500/40 font-mono text-sm font-black align-middle cursor-pointer transition-all shadow-2xs"
                title="Tap to see the meaning of this sign"
                aria-label={`Special sign ${hymn.sign}. Tap to view meaning`}
              >
                <span>{hymn.sign}</span>
                <HelpCircle size={12} className="opacity-70" />
              </button>
            )}
          </h1>

          {/* Sacred Cross Ornament */}
          <div className="flex items-center justify-center gap-2 text-[var(--accent)] text-xs font-serif my-2.5 opacity-80" aria-hidden="true">
            ─── ✝ ───
          </div>

          {/* Clean Tune & Meter Capsule */}
          {(parsed.tune || parsed.meter) && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-xs text-dim font-sans shadow-2xs">
              {parsed.tune && (
                <span className="font-semibold text-main flex items-center gap-1">
                  <Music size={12} className="text-[var(--accent)] shrink-0" />
                  <span>{parsed.tune}</span>
                </span>
              )}
              {parsed.tune && parsed.meter && <span className="text-dim/60">•</span>}
              {parsed.meter && <span className="font-mono text-[11px]">{parsed.meter}</span>}
            </div>
          )}

          {/* Scripture Reference (if present) */}
          {hymn.scripture && (
            <div className="text-xs text-dim mt-2.5 font-serif italic max-w-md mx-auto">
              {hymn.scripture}
            </div>
          )}
        </div>

        {/* Verses Container */}
        <main
          className={`flex flex-col gap-6 select-none hymn-lyrics-protected ${
            settings.fontFamily === 'serif' ? 'font-family-serif' : 'font-family-sans'
          } ${
            settings.textAlign === 'center' ? 'text-center' : settings.textAlign === 'justify' ? 'text-justify' : 'text-left'
          }`}
          onCopy={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          {hymn.verses.map((verse) => (
            <section
              key={verse.number}
              aria-label={`Verse ${verse.number}`}
              onCopy={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className={`relative transition-all select-none hymn-lyrics-protected ${
                settings.fontSize === 'sm'
                  ? 'text-sm sm:text-base'
                  : settings.fontSize === 'md'
                  ? 'text-base sm:text-lg'
                  : settings.fontSize === 'lg'
                  ? 'text-lg sm:text-xl'
                  : settings.fontSize === 'xl'
                  ? 'text-xl sm:text-2xl'
                  : 'text-2xl sm:text-3xl'
              } text-main`}
              style={{
                lineHeight:
                  settings.lineHeight === 'loose'
                    ? '2.1'
                    : settings.lineHeight === 'relaxed'
                    ? '1.85'
                    : '1.65',
              }}
            >
              <div className={`flex ${settings.textAlign === 'center' ? 'flex-col items-center' : 'items-start'} gap-3`}>
                {/* Circular Accent Badge Number */}
                <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs font-mono">
                  {verse.number}
                </span>

                {/* Verse Lines */}
                <div className="whitespace-pre-line flex-1 tracking-normal">
                  {verse.lines.map((line, idx) => (
                    <div key={idx} className="mb-0.5">
                      {line}
                    </div>
                  ))}
                  {verse.sign && (
                    <button
                      type="button"
                      onClick={() => handleOpenSign(verse.sign!, verse.signMeaning)}
                      className="mt-2 text-[11px] font-sans font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1.5 cursor-pointer hover:underline active:scale-95 transition-transform"
                      title="Tap to see the meaning of this verse sign"
                      aria-label={`Verse ${verse.number} sign ${verse.sign}. Tap to view meaning`}
                    >
                      <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                        {verse.sign}
                      </span>
                      <span className="text-[10px] text-dim flex items-center gap-0.5">
                        <span>Tap for sign meaning</span>
                        <HelpCircle size={10} />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </section>
          ))}

          {/* Refrain / Chorus */}
          {hymn.chorus && (
            <aside
              aria-label="Refrain"
              onCopy={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className={`my-2 pl-4 sm:pl-5 pr-4 py-3 border-l-2 border-[var(--accent)] bg-[var(--accent-bg)]/30 rounded-r-2xl text-main italic select-none hymn-lyrics-protected ${
                settings.fontSize === 'sm'
                  ? 'text-sm sm:text-base'
                  : settings.fontSize === 'md'
                  ? 'text-base sm:text-lg'
                  : settings.fontSize === 'lg'
                  ? 'text-lg sm:text-xl'
                  : settings.fontSize === 'xl'
                  ? 'text-xl sm:text-2xl'
                  : 'text-2xl sm:text-3xl'
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
              <div className="font-sans not-italic text-[10px] font-extrabold uppercase tracking-widest text-[var(--accent)] mb-1.5">
                Refrain
              </div>
              <div className="whitespace-pre-line">
                {hymn.chorus.map((line, idx) => (
                  <div key={idx} className="mb-0.5">
                    {line}
                  </div>
                ))}
              </div>
            </aside>
          )}
        </main>

        {/* Dedicated Bottom Clearance Spacer: ensures final verse and refrain always scroll completely above the floating toolbar */}
        <div
          className="w-full shrink-0 reading-content-spacer"
          style={{
            height: 'calc(140px + env(safe-area-inset-bottom, 24px))',
            minHeight: '140px',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Floating Citation Copied Toast */}
      {copied && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 animate-fade-in pointer-events-none">
          <Check size={14} />
          <span>Citation copied to clipboard</span>
        </div>
      )}

      {/* =========================================================================
          UNIFIED SINGLE-TIER FLOATING READING TOOLBAR
          Replaces the bulky two-tier stack with a sleek, 48px Midnight Navy capsule
          Reclaims 80px+ of viewport space for effortless hymn reading
          ========================================================================= */}
      <nav
        aria-label="Hymn Reading Toolbar"
        className="fixed inset-x-0 z-40 flex items-center justify-center pointer-events-none px-4 select-none"
        style={{
          bottom: 'max(22px, calc(env(safe-area-inset-bottom, 0px) + 16px))',
        }}
      >
        <div className="pointer-events-auto bg-[#182238]/95 backdrop-blur-md text-white shadow-2xl border border-white/20 rounded-full px-3 py-1.5 max-w-md w-full flex items-center justify-between transition-all h-12">
          {/* 0. Explicit Go Home Button */}
          <button
            type="button"
            onClick={onGoHome || onBack}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Return to Home Dashboard"
            aria-label="Return to Home Dashboard"
          >
            <Home size={16} />
          </button>

          {/* 1. Previous Hymn Button */}
          <button
            type="button"
            onClick={() => prevHymn && onNavigate(prevHymn)}
            disabled={!prevHymn}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              prevHymn
                ? 'text-white hover:text-[var(--accent)] active:scale-95'
                : 'text-white/25 cursor-not-allowed pointer-events-none'
            }`}
            title={prevHymn ? `Previous: #${prevHymn.number} ${prevHymn.title}` : 'First Hymn'}
            aria-label={prevHymn ? `Previous Hymn #${prevHymn.number}` : 'No previous hymn'}
          >
            <ChevronLeft size={16} />
            <span className="font-sans text-[11px] hidden xs:inline">Prev</span>
          </button>

          {/* 2. Direct Hymn Number Jump Pill (#150 ▼) */}
          <button
            type="button"
            onClick={openJumpDialog}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#182238] hover:bg-[#FDFBF7] font-mono font-extrabold text-xs sm:text-sm shadow-xs border border-white/30 transition-all cursor-pointer active:scale-95"
            title="Tap to jump directly to any hymn number (1–500)"
            aria-label={`Current Hymn #${hymn.number}. Tap to enter hymn number`}
          >
            <span>#{hymn.number}</span>
            <ChevronDown size={13} className="text-[#B56B2B] shrink-0" />
          </button>

          {/* 3. Next Hymn Button */}
          <button
            type="button"
            onClick={() => nextHymn && onNavigate(nextHymn)}
            disabled={!nextHymn}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              nextHymn
                ? 'text-white hover:text-[var(--accent)] active:scale-95'
                : 'text-white/25 cursor-not-allowed pointer-events-none'
            }`}
            title={nextHymn ? `Next: #${nextHymn.number} ${nextHymn.title}` : 'Last Hymn'}
            aria-label={nextHymn ? `Next Hymn #${nextHymn.number}` : 'No next hymn'}
          >
            <span className="font-sans text-[11px] hidden xs:inline">Next</span>
            <ChevronRight size={16} />
          </button>

          {/* Vertical Separator */}
          <div className="w-px h-5 bg-white/20 mx-0.5 shrink-0" aria-hidden="true" />

          {/* 4. Direct Font Size Steppers (A- and A+) */}
          <div className="flex items-center bg-white/10 rounded-full px-1 py-0.5 border border-white/15">
            <button
              type="button"
              onClick={() => onQuickFontSize(-1)}
              className="px-1.5 py-0.5 rounded text-[11px] font-bold font-serif text-white/85 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Decrease hymn font size (A-)"
              aria-label="Decrease font size"
            >
              A-
            </button>
            <div className="w-px h-3 bg-white/20 mx-0.5" />
            <button
              type="button"
              onClick={() => onQuickFontSize(1)}
              className="px-1.5 py-0.5 rounded text-[11px] font-bold font-serif text-white/85 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Increase hymn font size (A+)"
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>

          {/* 5. Quick Theme Toggle (Morning Grace Ivory <-> Royal Sanctuary Navy) */}
          <button
            type="button"
            onClick={() => {
              if (onToggleDarkMode) onToggleDarkMode();
            }}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Toggle Morning Grace / Royal Sanctuary theme"
            aria-label="Toggle Theme"
          >
            <Palette size={16} />
          </button>

          {/* 6. Pitch Pipe Drone (440Hz A4) */}
          <button
            type="button"
            onClick={handlePlayPitch}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isPlayingPitch
                ? 'text-amber-300 bg-white/20 animate-pulse'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Play pitch reference tuning drone (A4 / 440 Hz)"
            aria-label="Audio Pitch Pipe"
          >
            {isPlayingPitch ? <Volume2 size={16} /> : <Music size={16} />}
          </button>

          {/* 7. More Options Popover Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="More reading options"
              aria-label="More options"
            >
              <MoreHorizontal size={16} />
            </button>

            {/* Popover Action Menu */}
            {isMoreMenuOpen && (
              <div
                className="absolute bottom-12 right-0 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-xl p-2 w-52 flex flex-col gap-1 z-50 animate-slide-up select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Return to Home Action */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    if (onGoHome) onGoHome();
                    else if (onBack) onBack();
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-sub hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer text-left"
                >
                  <Home size={15} />
                  <span>Return to Home Dashboard</span>
                </button>

                {/* Bookmark Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    onToggleFavorite();
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-sub hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer text-left"
                >
                  <Bookmark
                    size={15}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    className={isFavorite ? 'text-[var(--accent)]' : ''}
                  />
                  <span>{isFavorite ? 'Remove Bookmark' : 'Bookmark Hymn'}</span>
                </button>

                {/* Spacing Quick Toggle */}
                {onToggleLineSpacing && (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleLineSpacing();
                      setIsMoreMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-sub hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer text-left"
                  >
                    <AlignLeft size={15} />
                    <span>Line Spacing: {settings.lineHeight}</span>
                  </button>
                )}

                {/* Share Hymn Citation */}
                <button
                  type="button"
                  onClick={() => {
                    handleShare();
                    setIsMoreMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-sub hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer text-left"
                >
                  <Share2 size={15} />
                  <span>Share Citation</span>
                </button>

                <div className="border-t border-[var(--border-color)] my-1" />

                {/* Full Settings Navigation */}
                {onOpenSettings && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenSettings();
                      setIsMoreMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-sub hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer text-left"
                  >
                    <Settings size={15} />
                    <span>Reading Settings...</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Direct Hymn-Number Selection Modal Dialog */}
      {isJumpDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in select-none"
          onClick={() => setIsJumpDialogOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl shadow-[var(--shadow-dock)] p-5 sm:p-6 flex flex-col gap-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="jump-dialog-title"
          >
            {/* Dialog Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-color)]">
              <div>
                <h2 id="jump-dialog-title" className="text-base font-bold text-main font-serif">
                  Select Hymn Number
                </h2>
                <p className="text-xs text-dim font-sans">
                  Currently reading #{hymn.number} • {hymn.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsJumpDialogOpen(false)}
                className="p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main cursor-pointer transition-colors"
                aria-label="Cancel and close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Jump Form with Numeric Input */}
            <form onSubmit={handleConfirmJump} className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="jump-hymn-input"
                  className="block text-xs font-bold uppercase tracking-wider text-dim mb-1.5 font-sans"
                >
                  Enter Number (1 – 500)
                </label>
                <div className="relative flex items-center">
                  <input
                    id="jump-hymn-input"
                    ref={jumpInputRef}
                    type="number"
                    min="1"
                    max="500"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={jumpInput}
                    onChange={(e) => {
                      setJumpInput(e.target.value);
                      setJumpError(null);
                    }}
                    placeholder="e.g. 150"
                    className="w-full h-12 px-4 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-main font-mono text-2xl font-bold text-center outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 shadow-xs transition-all"
                  />
                  {jumpInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setJumpInput('');
                        setJumpError(null);
                        jumpInputRef.current?.focus();
                      }}
                      className="absolute right-3 p-1 rounded-full text-dim hover:text-main hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                      aria-label="Clear input"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Real-time Preview / Friendly Error */}
              <div className="min-h-[58px] flex items-center justify-center p-2.5 rounded-xl bg-[var(--bg-surface-alt)]/60 border border-[var(--border-color)]/60 text-center">
                {jumpError ? (
                  <span className="text-xs font-semibold text-rose-500 font-sans">
                    {jumpError}
                  </span>
                ) : targetHymnPreview ? (
                  <div className="animate-fade-in text-center px-2">
                    <div className="text-xs font-bold text-gold font-mono">
                      #{targetHymnPreview.number}
                    </div>
                    <div className="text-sm font-serif font-semibold text-main truncate max-w-[260px]">
                      {targetHymnPreview.title}
                    </div>
                    <div className="text-[11px] text-dim font-sans">
                      {targetHymnPreview.verseCount} verses • {targetHymnPreview.sectionName.replace('SECTION ', 'Section ')}
                    </div>
                  </div>
                ) : trimmedJump ? (
                  <span className="text-xs text-rose-500 font-sans font-medium">
                    Please enter a number between 1 and 500
                  </span>
                ) : (
                  <span className="text-xs text-dim font-sans">
                    Type 1 to 500 to jump directly
                  </span>
                )}
              </div>

              {/* Action Buttons: Cancel and Go to Hymn */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsJumpDialogOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-full border border-[var(--border-color)] text-sub hover:text-main text-xs font-semibold cursor-pointer transition-colors min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!targetHymnPreview}
                  className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer min-h-[40px] ${
                    targetHymnPreview
                      ? 'bg-[#8B1E28] hover:bg-[#6D151E] text-white active:scale-95'
                      : 'bg-[var(--bg-surface-alt)] text-dim border border-[var(--border-color)] opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span>Go to Hymn</span>
                  {targetHymnPreview && (
                    <span className="font-mono">#{targetHymnPreview.number}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tap-to-View Sign Meaning Modal */}
      {activeSignModal && (
        <SignMeaningModal
          isOpen={!!activeSignModal}
          onClose={handleCloseSign}
          sign={activeSignModal.sign}
          meaning={activeSignModal.meaning}
          hymnNumber={hymn.number}
        />
      )}
    </div>
  );
};

export default HymnViewer;
