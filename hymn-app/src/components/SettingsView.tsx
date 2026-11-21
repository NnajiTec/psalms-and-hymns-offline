import React, { useState } from 'react';
import {
  ArrowLeft,
  Palette,
  Volume2,
  Sun,
  Moon,
  Check,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  ChevronRight,
  Info,
  Star,
  X,
  Type,
  Trash2,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import type { AppSettings, FontSize, FontFamily, LineHeight, TextAlign } from '../types/hymn';
import { clearHistory } from '../services/storage';
import { themes } from '../theme/tokens';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onBack: () => void;
  onGoHome?: () => void;
}

interface SettingCardProps {
  children: React.ReactNode;
  className?: string;
}

interface SettingSectionHeaderProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SettingToggleRowProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

interface SettingActionRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
  trailingIcon?: React.ReactNode;
}

// ============================================================================
// Subcomponents (Clean Architecture & Modular Domain Design)
// ============================================================================

/**
 * Accessible container card honoring the 8px grid vertical rhythm with generous margins.
 */
const SettingCard: React.FC<SettingCardProps> = ({ children, className = '' }) => (
  <section
    className={`bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-5 sm:p-6 shadow-xs space-y-6 ${className}`}
  >
    {children}
  </section>
);

/**
 * Accessible section header with WCAG compliant contrast and responsive typography.
 */
const SettingSectionHeader: React.FC<SettingSectionHeaderProps> = ({
  id,
  icon,
  title,
  description,
}) => (
  <div className="flex items-center gap-3.5 pb-4 border-b border-[var(--border-color)]">
    <div
      className="w-10 h-10 rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)] flex items-center justify-center shrink-0"
      aria-hidden="true"
    >
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <h2 id={id} className="text-base sm:text-lg font-serif font-bold text-main leading-snug">
        {title}
      </h2>
      <p className="text-xs text-sub mt-0.5 leading-normal">
        {description}
      </p>
    </div>
  </div>
);

/**
 * Accessible toggle row with switch semantics (role="switch", aria-checked).
 */
const SettingToggleRow: React.FC<SettingToggleRowProps> = ({
  id,
  icon,
  title,
  description,
  checked,
  onToggle,
}) => {
  const labelId = `${id}-label`;
  const descId = `${id}-desc`;

  return (
    <div className="flex items-center justify-between py-4 gap-4">
      <div className="flex items-start gap-3.5 min-w-0 pr-2">
        <div
          className="w-10 h-10 rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5"
          aria-hidden="true"
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div id={labelId} className="text-sm sm:text-base font-bold text-main leading-snug">
            {title}
          </div>
          <div id={descId} className="text-xs text-sub mt-0.5 leading-normal">
            {description}
          </div>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descId}
        onClick={onToggle}
        className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative p-0.5 shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden ${
          checked ? 'bg-[var(--accent)]' : 'bg-slate-300 dark:bg-slate-700'
        }`}
      >
        <span
          className={`block w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

/**
 * Accessible clickable action row for dialogs and secondary tasks.
 */
const SettingActionRow: React.FC<SettingActionRowProps> = ({
  icon,
  title,
  description,
  badge,
  onClick,
  trailingIcon = <ChevronRight size={18} className="text-sub" />,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-between p-3.5 sm:p-4 cursor-pointer hover:bg-[var(--bg-surface-alt)] rounded-2xl transition-colors text-left focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden"
  >
    <div className="flex items-center gap-3.5 min-w-0 pr-3">
      <div
        className="w-9 h-9 rounded-xl bg-[var(--accent-bg)] text-[var(--accent)] flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-main leading-snug">{title}</div>
        <div className="text-xs text-sub mt-0.5 leading-normal">{description}</div>
      </div>
    </div>

    <div className="flex items-center gap-2 shrink-0">
      {badge && (
        <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-bg)]">
          {badge}
        </span>
      )}
      {trailingIcon}
    </div>
  </button>
);

/**
 * Font Family Selector Pill subcomponent with visual preview and radio role.
 */
interface FontFamilySelectorProps {
  selected: FontFamily;
  onChange: (family: FontFamily) => void;
}

const FontFamilySelector: React.FC<FontFamilySelectorProps> = ({ selected, onChange }) => {
  const families: { id: FontFamily; label: string; sub: string; preview: string }[] = [
    { id: 'serif', label: 'Lora Serif', sub: 'Classic Sacred Font', preview: 'Aa' },
    { id: 'sans', label: 'Plus Jakarta', sub: 'Modern Clean Sans', preview: 'Aa' },
  ];

  return (
    <div className="space-y-3" role="radiogroup" aria-labelledby="font-family-label">
      <div id="font-family-label" className="text-xs font-bold text-sub font-sans uppercase tracking-wider">
        Font Family
      </div>
      <div className="grid grid-cols-2 gap-3">
        {families.map((ff) => {
          const isSelected = selected === ff.id;
          return (
            <button
              key={ff.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(ff.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[110px] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden ${
                isSelected
                  ? 'border-[var(--accent)] bg-[var(--accent-bg)] ring-2 ring-[var(--accent)]/20 shadow-xs'
                  : 'border-[var(--border-color)] bg-[var(--bg-surface-alt)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <span
                  className={`text-2xl font-bold leading-none ${
                    ff.id === 'serif' ? 'font-serif text-[var(--accent)]' : 'font-sans text-main'
                  }`}
                  aria-hidden="true"
                >
                  {ff.preview}
                </span>
                {isSelected ? (
                  <span
                    className="w-5 h-5 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs shadow-xs"
                    aria-hidden="true"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border-2 border-[var(--border-color)]" aria-hidden="true" />
                )}
              </div>
              <div>
                <div className={`text-sm sm:text-base font-bold text-main ${ff.id === 'serif' ? 'font-serif' : 'font-sans'}`}>
                  {ff.label}
                </div>
                <div className="text-xs text-sub mt-0.5 font-sans leading-normal">
                  {ff.sub}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Accessible Font Size Slider subcomponent.
 */
interface FontSizeSliderProps {
  currentSize: FontSize;
  onChange: (size: FontSize) => void;
}

const FontSizeSlider: React.FC<FontSizeSliderProps> = ({ currentSize, onChange }) => {
  const fontSizes: { id: FontSize; label: string; value: number }[] = [
    { id: 'sm', label: 'Small', value: 0 },
    { id: 'md', label: 'Medium', value: 1 },
    { id: 'lg', label: 'Large', value: 2 },
    { id: 'xl', label: 'X-Large', value: 3 },
    { id: '2xl', label: '2X-Large', value: 4 },
  ];

  const currentSizeIndex = fontSizes.findIndex((s) => s.id === currentSize) ?? 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const target = fontSizes[val];
    if (target) {
      onChange(target.id);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label htmlFor="font-size-slider" className="text-xs font-bold text-sub font-sans uppercase tracking-wider">
          Font Size
        </label>
        <span
          className="px-3 py-1 rounded-full bg-[var(--bg-surface-alt)] text-[var(--accent)] font-mono text-xs font-bold border border-[var(--border-color)]"
          aria-live="polite"
        >
          {fontSizes[currentSizeIndex]?.label || 'Medium'}
        </span>
      </div>

      <div className="flex items-center gap-3.5 py-2 px-1">
        <span className="text-xs font-serif font-bold text-sub select-none" aria-hidden="true">A</span>
        <input
          id="font-size-slider"
          type="range"
          min="0"
          max="4"
          step="1"
          value={currentSizeIndex}
          onChange={handleChange}
          aria-label="Hymn text font size"
          aria-valuemin={0}
          aria-valuemax={4}
          aria-valuenow={currentSizeIndex}
          aria-valuetext={fontSizes[currentSizeIndex]?.label}
          className="flex-1 h-2 bg-[var(--bg-surface-alt)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden"
        />
        <span className="text-xl sm:text-2xl font-serif font-extrabold text-main select-none" aria-hidden="true">A</span>
      </div>
    </div>
  );
};

/**
 * Reusable Segmented Control for Line Spacing and Text Alignment.
 */
interface SegmentedOption<T extends string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  labelId: string;
  label: string;
  options: SegmentedOption<T>[];
  selected: T;
  onChange: (val: T) => void;
}

function SegmentedControl<T extends string>({
  labelId,
  label,
  options,
  selected,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="space-y-3" role="radiogroup" aria-labelledby={labelId}>
      <div id={labelId} className="text-xs font-bold text-sub font-sans uppercase tracking-wider">
        {label}
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)]">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.id)}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-0 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden ${
                isSelected
                  ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                  : 'text-sub hover:text-main'
              }`}
            >
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <span className="truncate">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Theme Selector Subcomponent with Daylight / Sanctuary presets.
 */
interface ThemeSelectorProps {
  currentTheme: AppSettings['theme'];
  onSelectTheme: (theme: AppSettings['theme']) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onSelectTheme }) => (
  <div className="space-y-3" role="radiogroup" aria-labelledby="theme-selection-label">
    <div id="theme-selection-label" className="sr-only">
      Reading Theme Selection
    </div>
    <div className="grid grid-cols-2 gap-3.5">
      {/* Light Theme: Morning Grace */}
      <button
        type="button"
        role="radio"
        aria-checked={currentTheme === 'light'}
        aria-label="Morning Grace theme, warm ivory day mode"
        onClick={() => onSelectTheme('light')}
        className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer shadow-xs flex flex-col justify-between min-h-[135px] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden ${
          currentTheme === 'light'
            ? 'border-[var(--accent)] bg-[#F7F4ED] ring-2 ring-[var(--accent)]/30'
            : 'border-[var(--border-color)] bg-[#F7F4ED]/60 hover:border-[var(--accent)]/50'
        }`}
      >
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1.5">
            <Sun size={15} className="text-[#B56B2B]" aria-hidden="true" />
            <span className="text-[10px] font-mono font-bold text-[#B56B2B] uppercase tracking-wider">
              Daylight
            </span>
          </div>
          {currentTheme === 'light' ? (
            <span className="w-5 h-5 rounded-full bg-[#B56B2B] text-white flex items-center justify-center shadow-xs" aria-hidden="true">
              <Check size={12} strokeWidth={3} />
            </span>
          ) : (
            <span className="w-5 h-5 rounded-full border-2 border-[#DDD8CA]" aria-hidden="true" />
          )}
        </div>
        <div className="py-1">
          <div className="text-sm sm:text-base font-serif font-bold text-[#182238] leading-tight">
            {themes.light.name}
          </div>
          <div className="text-xs font-sans text-stone-600 font-medium mt-0.5 leading-normal">
            {themes.light.subtitle}
          </div>
        </div>
        <div className="flex items-center gap-1.5 pt-2 border-t border-[#DDD8CA]/60" aria-hidden="true">
          {themes.light.swatches.map((color, idx) => (
            <span
              key={idx}
              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>

      {/* Dark Theme: Royal Sanctuary */}
      <button
        type="button"
        role="radio"
        aria-checked={currentTheme === 'dark'}
        aria-label="Royal Sanctuary theme, midnight navy night mode"
        onClick={() => onSelectTheme('dark')}
        className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer shadow-xs flex flex-col justify-between min-h-[135px] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden ${
          currentTheme === 'dark'
            ? 'border-[var(--accent)] bg-[#111726] ring-2 ring-[var(--accent)]/30 text-white'
            : 'border-[var(--border-color)] bg-[#111726]/85 hover:border-[var(--accent)]/50 text-white'
        }`}
      >
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1.5">
            <Moon size={15} className="text-[#D98236]" aria-hidden="true" />
            <span className="text-[10px] font-mono font-bold text-[#D98236] uppercase tracking-wider">
              Sanctuary
            </span>
          </div>
          {currentTheme === 'dark' ? (
            <span className="w-5 h-5 rounded-full bg-[#D98236] text-white flex items-center justify-center shadow-xs" aria-hidden="true">
              <Check size={12} strokeWidth={3} />
            </span>
          ) : (
            <span className="w-5 h-5 rounded-full border-2 border-white/20" aria-hidden="true" />
          )}
        </div>
        <div className="py-1">
          <div className="text-sm sm:text-base font-serif font-bold text-[#F7F4ED] leading-tight">
            {themes.dark.name}
          </div>
          <div className="text-xs font-sans text-amber-200/90 font-medium mt-0.5 leading-normal">
            {themes.dark.subtitle}
          </div>
        </div>
        <div className="flex items-center gap-1.5 pt-2 border-t border-white/10" aria-hidden="true">
          {themes.dark.swatches.map((color, idx) => (
            <span
              key={idx}
              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-2xs"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>
    </div>
  </div>
);

/**
 * Accessible About Modal Dialog.
 */
interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-dialog-title"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <img src="/app-icon.png" alt="App Logo" className="w-9 h-9 rounded-xl object-cover shadow-xs border border-amber-300/30" />
            <h3 id="about-dialog-title" className="font-serif font-bold text-base text-main">
              Psalms &amp; Hymns Offline
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-sub hover:text-main cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="text-xs sm:text-sm text-sub space-y-2.5 font-sans leading-relaxed">
          <p>
            Complete 500 hymns and metrical psalms companion collection for worship, fellowship, and personal devotion.
          </p>
          <p>
            100% self-contained offline architecture. All typefaces, indexes, meters, and devotions operate without an internet connection.
          </p>
          <div className="pt-2.5 text-[11px] font-sans text-dim border-t border-[var(--border-color)] space-y-1">
            <div className="font-mono">Offline Build 1.6 (Version 1.6) • Released for Worship &amp; Praise</div>
            <div className="font-semibold text-main pt-0.5">
              Copyright &copy; 2026 Chukwuemeka Nnaji (Nnajitec)
            </div>
            <div>
              Contact:{' '}
              <a
                href="mailto:nnajitec@gmail.com"
                className="text-[var(--accent)] hover:underline font-medium"
              >
                nnajitec@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer hover:bg-[var(--accent-hover)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Accessible Legal Acknowledgments & Copyright Modal.
 */
interface AcknowledgmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcknowledgmentsModal: React.FC<AcknowledgmentsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in text-main"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ack-dialog-title"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 id="ack-dialog-title" className="font-serif font-bold text-base sm:text-lg text-main">
                Acknowledgments &amp; Legal
              </h3>
              <p className="text-[11px] text-dim font-sans">
                Liturgical Sources &amp; Public Domain Notice
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-sub hover:text-main cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="text-xs text-sub space-y-3 font-sans leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--accent)]/30 space-y-1.5">
            <div className="font-bold text-main">Application Software Copyright</div>
            <p>
              <strong>Copyright &copy; 2026 Chukwuemeka Nnaji (Nnajitec)</strong>. All rights reserved for the application software, user interface, audio pitch generator, and offline search architecture.
            </p>
            <p>
              Developer Contact:{' '}
              <a
                href="mailto:nnajitec@gmail.com"
                className="text-[var(--accent)] hover:underline font-semibold"
              >
                nnajitec@gmail.com
              </a>
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] space-y-1">
            <div className="font-bold text-main">Public Domain Classical Hymns</div>
            <p>
              The vast majority of the 500 hymns, metrical psalms, and tunes in this collection—including works by Isaac Watts, Charles Wesley, John Newton, Horatius Bonar, James George Deck, Henry Francis Lyte, and Thomas Kelly—are in the universal <strong>Public Domain</strong> worldwide.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] space-y-1">
            <div className="font-bold text-main">Historical Compilation &amp; Preservation</div>
            <p>
              Grateful acknowledgment is made to the compilers, editors, and historical publishers of <em>Psalms, Hymns and Spiritual Songs</em> for their faithful preservation of this sacred collection and liturgical occasion classifications.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] space-y-1">
            <div className="font-bold text-main">Free Ministry &amp; Good-Faith Safe Harbor</div>
            <p>
              This digital application is provided freely and non-commercially for Christian worship, personal devotions, and offline study. If any copyrighted modern arrangement or text has been included in error, please contact the developer at{' '}
              <a
                href="mailto:nnajitec@gmail.com"
                className="text-[var(--accent)] hover:underline font-medium"
              >
                nnajitec@gmail.com
              </a>{' '}
              for prompt attribution or adjustment.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer hover:bg-[var(--accent-hover)] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Accessible Voluntary Support (Tip Jar) Modal.
 */
interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [thankYouMessage, setThankYouMessage] = useState(false);

  if (!isOpen) return null;

  const handleSupport = (tierName: string) => {
    setSelectedTier(tierName);
    setThankYouMessage(true);
    setTimeout(() => {
      setThankYouMessage(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-scale-in text-main"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-dialog-title"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-500 border border-rose-500/30 flex items-center justify-center">
              <Heart size={20} className="fill-rose-500" />
            </div>
            <div>
              <h3 id="support-dialog-title" className="font-serif font-bold text-base text-main">
                Support Development
              </h3>
              <p className="text-[11px] text-dim font-sans">
                Voluntary Ministry Contribution
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-sub hover:text-main cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {thankYouMessage ? (
          <div className="py-8 text-center space-y-2 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Check size={24} />
            </div>
            <h4 className="font-serif font-bold text-base text-main">Thank You So Much!</h4>
            <p className="text-xs text-sub leading-relaxed max-w-xs mx-auto">
              Your encouragement and voluntary gift ({selectedTier}) support ongoing updates, maintenance, and bug fixes. May God bless you abundantly!
            </p>
          </div>
        ) : (
          <>
            <div className="text-xs text-sub space-y-2 font-sans leading-relaxed">
              <p>
                <strong>Psalms &amp; Hymns</strong> is provided 100% free with no ads, paywalls, or subscriptions.
              </p>
              <p>
                If this app has blessed your assembly worship and personal praise, you can voluntarily support ongoing app maintenance and developer costs:
              </p>
            </div>

            {/* Donation / Tip Tiers */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleSupport('$2 • Buy a Coffee')}
                className="w-full py-2.5 px-4 rounded-2xl bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)] border border-[var(--border-color)] hover:border-[var(--accent)] text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">☕</span>
                  <div>
                    <div className="text-xs font-bold text-main group-hover:text-[var(--accent)]">
                      Buy a Coffee
                    </div>
                    <div className="text-[10px] text-dim">Small token of appreciation</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent-bg)] px-2 py-0.5 rounded-lg border border-[var(--accent)]/30">
                  $2.00
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSupport('$5 • Hymnal Supporter')}
                className="w-full py-2.5 px-4 rounded-2xl bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)] border border-[var(--border-color)] hover:border-[var(--accent)] text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">📖</span>
                  <div>
                    <div className="text-xs font-bold text-main group-hover:text-[var(--accent)]">
                      Hymnal Supporter
                    </div>
                    <div className="text-[10px] text-dim">Help cover hosting &amp; SDK costs</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent-bg)] px-2 py-0.5 rounded-lg border border-[var(--accent)]/30">
                  $5.00
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSupport('$10 • Patron of Praise')}
                className="w-full py-2.5 px-4 rounded-2xl bg-[var(--bg-surface-alt)] hover:bg-[var(--accent-bg)] border border-[var(--border-color)] hover:border-[var(--accent)] text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🕊️</span>
                  <div>
                    <div className="text-xs font-bold text-main group-hover:text-[var(--accent)]">
                      Patron of Praise
                    </div>
                    <div className="text-[10px] text-dim">Generous ministry blessing</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent-bg)] px-2 py-0.5 rounded-lg border border-[var(--accent)]/30">
                  $10.00
                </span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-sans text-dim hover:text-main cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Main Settings View Component
// ============================================================================

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onBack,
}) => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showAckModal, setShowAckModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showRateMessage, setShowRateMessage] = useState(false);
  const [historyCleared, setHistoryCleared] = useState(false);

  const lineSpacingOptions: SegmentedOption<LineHeight>[] = [
    { id: 'normal', label: 'Compact' },
    { id: 'relaxed', label: 'Normal' },
    { id: 'loose', label: 'Spacious' },
  ];

  const alignmentOptions: SegmentedOption<TextAlign>[] = [
    { id: 'left', label: 'Left', icon: <AlignLeft size={16} /> },
    { id: 'center', label: 'Center', icon: <AlignCenter size={16} /> },
    { id: 'justify', label: 'Justify', icon: <AlignJustify size={16} /> },
  ];

  const handleClearHistory = () => {
    clearHistory();
    setHistoryCleared(true);
    setTimeout(() => setHistoryCleared(false), 2500);
  };

  return (
    <div
      className="flex-1 w-full min-h-0 overflow-y-auto pb-48 scroll-smooth app-bg touch-pan-y overscroll-contain select-none"
      role="region"
      aria-label="Settings and Preferences"
    >
      {/* =======================================================================
          STICKY HEADER: Midnight Navy (#182238) with status bar clearance
          ======================================================================= */}
      <header
        role="banner"
        className="sticky top-0 z-30 bg-[#182238] text-white shadow-md select-none border-b border-white/10"
        style={{
          paddingTop: 'max(env(safe-area-inset-top, 24px), 24px)',
        }}
      >
        <div className="max-w-xl mx-auto px-6 sm:px-10 h-14 sm:h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-hidden"
            aria-label="Back to previous screen"
          >
            <ArrowLeft size={20} />
            <span className="text-xs font-sans font-medium text-white/80">Back</span>
          </button>

          <h1 className="text-base sm:text-lg font-serif font-bold tracking-wide text-white">
            Settings
          </h1>

          <div className="w-12" aria-hidden="true" />
        </div>
      </header>

      {/* =======================================================================
          MAIN SETTINGS BODY: Generous, comfortable side padding & 8px grid
          ======================================================================= */}
      <main className="max-w-xl mx-auto px-6 sm:px-10 py-7 space-y-7 pb-52">
        
        {/* CARD 1: Typography & Reading Layout */}
        <SettingCard>
          <SettingSectionHeader
            id="heading-typography"
            icon={<Type size={20} />}
            title="Typography &amp; Layout"
            description="Customize font style, size, and stanza line spacing"
          />

          {/* 1.1 Font Family Selection */}
          <FontFamilySelector
            selected={settings.fontFamily}
            onChange={(fontFamily) => onUpdateSettings({ fontFamily })}
          />

          <div className="border-t border-[var(--border-color)]/60 my-2" aria-hidden="true" />

          {/* 1.2 Font Size Slider */}
          <FontSizeSlider
            currentSize={settings.fontSize}
            onChange={(fontSize) => onUpdateSettings({ fontSize })}
          />

          <div className="border-t border-[var(--border-color)]/60 my-2" aria-hidden="true" />

          {/* 1.3 Line Spacing Segmented Control */}
          <SegmentedControl<LineHeight>
            labelId="label-line-spacing"
            label="Line Spacing"
            options={lineSpacingOptions}
            selected={settings.lineHeight}
            onChange={(lineHeight) => onUpdateSettings({ lineHeight })}
          />

          <div className="border-t border-[var(--border-color)]/60 my-2" aria-hidden="true" />

          {/* 1.4 Text Alignment Segmented Control */}
          <SegmentedControl<TextAlign>
            labelId="label-text-alignment"
            label="Text Alignment"
            options={alignmentOptions}
            selected={settings.textAlign}
            onChange={(textAlign) => onUpdateSettings({ textAlign })}
          />
        </SettingCard>

        {/* CARD 2: Sacred Theme Selection */}
        <SettingCard>
          <SettingSectionHeader
            id="heading-theme"
            icon={<Palette size={20} />}
            title="Reading Theme"
            description="Sacred color palettes optimized for daylight and quiet sanctuaries"
          />

          <ThemeSelector
            currentTheme={settings.theme}
            onSelectTheme={(theme) => onUpdateSettings({ theme })}
          />
        </SettingCard>

        {/* CARD 3: Audio & Device Controls */}
        <SettingCard className="divide-y divide-[var(--border-color)] space-y-0">
          <SettingSectionHeader
            id="heading-device"
            icon={<Volume2 size={20} />}
            title="Audio &amp; Display"
            description="Pitch pipe tuning and screen illumination behavior"
          />

          {/* Audio Pitch Pipe Toggle */}
          <SettingToggleRow
            id="toggle-pitch-pipe"
            icon={<Volume2 size={18} />}
            title="Audio Pitch Pipe"
            description="Play reference concert tuning note (A4 / 440 Hz)"
            checked={settings.hapticFeedback}
            onToggle={() => onUpdateSettings({ hapticFeedback: !settings.hapticFeedback })}
          />

          {/* Prevent Display Sleep Toggle */}
          <SettingToggleRow
            id="toggle-screen-awake"
            icon={<Sun size={18} />}
            title="Prevent Display Sleep"
            description="Keep screen illuminated while reading hymns &amp; psalms"
            checked={settings.keepScreenAwake}
            onToggle={() => onUpdateSettings({ keepScreenAwake: !settings.keepScreenAwake })}
          />
        </SettingCard>

        {/* CARD 4: Offline Hymnal Maintenance & Information */}
        <section
          aria-labelledby="heading-maintenance"
          className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-3 sm:p-4 shadow-xs divide-y divide-[var(--border-color)]"
        >
          <h2 id="heading-maintenance" className="sr-only">
            Hymnal Maintenance &amp; Information
          </h2>

          <SettingActionRow
            icon={<Heart size={18} className="text-rose-500 fill-rose-500" />}
            title="Support the Developer"
            description="Voluntary contribution / buy a coffee to support maintenance"
            badge="Tip Jar"
            onClick={() => setShowSupportModal(true)}
          />

          <SettingActionRow
            icon={<ShieldCheck size={18} className="text-emerald-500" />}
            title="Acknowledgments &amp; Copyright"
            description="Copyright © 2026 Chukwuemeka Nnaji (Nnajitec) &amp; liturgical sources"
            onClick={() => setShowAckModal(true)}
          />

          <SettingActionRow
            icon={<Info size={18} />}
            title="About Psalms &amp; Hymns"
            description="Complete 500 hymns offline collection details"
            onClick={() => setShowAboutModal(true)}
          />

          <SettingActionRow
            icon={<Trash2 size={18} />}
            title="Clear Sung History"
            description={historyCleared ? 'History cleared successfully!' : 'Reset recently opened hymns cache'}
            badge={historyCleared ? 'Cleared' : 'Reset'}
            onClick={handleClearHistory}
          />

          <SettingActionRow
            icon={<Star size={18} className="fill-[var(--accent)] text-[var(--accent)]" />}
            title="Rate This App"
            description="Share your encouragement with other worshippers"
            onClick={() => {
              setShowRateMessage(true);
              setTimeout(() => setShowRateMessage(false), 3000);
            }}
          />
        </section>

        {/* Feedback Alert for Rating */}
        {showRateMessage && (
          <div
            role="status"
            className="p-4 rounded-2xl bg-[var(--accent-bg)] text-[var(--accent)] text-xs sm:text-sm font-semibold text-center border border-[var(--accent)]/30 animate-fade-in"
          >
            Thank you for worshipping with Psalms &amp; Hymns! May God bless you richly.
          </div>
        )}

        {/* Version & Copyright Information */}
        <div className="text-center text-xs text-dim pt-2 pb-8 space-y-1">
          <div className="font-mono select-none">
            Psalms &amp; Hymns Offline • Version 1.6 (Build 7)
          </div>
          <div className="font-sans">
            Copyright &copy; 2026 Chukwuemeka Nnaji (Nnajitec) •{' '}
            <a
              href="mailto:nnajitec@gmail.com"
              className="text-[var(--accent)] hover:underline font-medium"
            >
              nnajitec@gmail.com
            </a>
          </div>
        </div>
      </main>

      {/* Modal Dialog for About Screen */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />

      {/* Modal Dialog for Legal Acknowledgments & Copyright */}
      <AcknowledgmentsModal
        isOpen={showAckModal}
        onClose={() => setShowAckModal(false)}
      />

      {/* Modal Dialog for Voluntary Support / Tip Jar */}
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </div>
  );
};

export default SettingsView;
