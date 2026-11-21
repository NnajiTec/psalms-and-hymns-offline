import React from 'react';
import {
  X,
  Sun,
  Moon,
  Check,
  AlignLeft,
  AlignCenter,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import type { AppSettings, ThemeMode, FontSize, FontFamily, LineHeight } from '../types/hymn';
import { DEFAULT_SETTINGS } from '../services/storage';

interface TypographyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  canInstallPWA?: boolean;
  onInstallPWA?: () => void;
}

export const TypographyDrawer: React.FC<TypographyDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const themes: {
    id: ThemeMode;
    label: string;
    sub: string;
    icon: React.ReactNode;
    bg: string;
    text: string;
    accent: string;
  }[] = [
    {
      id: 'light',
      label: 'Warm Ivory',
      sub: 'Classic Hymnal Standard',
      icon: <Sun size={17} />,
      bg: '#F7F4ED',
      text: '#182238',
      accent: '#B56B2B',
    },
    {
      id: 'dark',
      label: 'Midnight Navy',
      sub: 'Low-light Sanctuary Mode',
      icon: <Moon size={17} />,
      bg: '#111726',
      text: '#F7F4ED',
      accent: '#D98236',
    },
  ];

  const fontSizes: { id: FontSize; label: string }[] = [
    { id: 'sm', label: 'S' },
    { id: 'md', label: 'M' },
    { id: 'lg', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: '2xl', label: '2XL' },
  ];

  const fontFamilies: { id: FontFamily; label: string; sub: string }[] = [
    { id: 'serif', label: 'Lora Serif', sub: 'Traditional Sacred Hymnal' },
    { id: 'sans', label: 'Plus Jakarta', sub: 'Clean Modern Sans' },
  ];

  const lineHeights: { id: LineHeight; label: string; desc: string }[] = [
    { id: 'normal', label: 'Compact', desc: '1.65x' },
    { id: 'relaxed', label: 'Relaxed', desc: '1.85x' },
    { id: 'loose', label: 'Spacious', desc: '2.1x' },
  ];

  const handleResetDefaults = () => {
    onUpdateSettings(DEFAULT_SETTINGS);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className="w-full sm:max-w-md max-h-[90vh] flex flex-col bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-t-[28px] sm:rounded-[28px] shadow-[var(--shadow-dock)] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[var(--border-color)]" />
        </div>

        {/* Modal Header */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-header)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent)]/30 flex items-center justify-center text-gold shadow-xs">
              <Sliders size={16} />
            </div>
            <div>
              <h2 id="settings-title" className="text-base font-serif font-bold text-main leading-tight">
                Settings
              </h2>
              <p className="text-xs text-dim font-sans">
                Appearance & reading options
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main cursor-pointer transition-colors"
            aria-label="Close Settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Settings Body */}
        <div
          className="flex-1 overflow-y-auto p-5 space-y-5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* 1. Two Color Themes */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-dim block mb-2 font-sans">
              Color Theme
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {themes.map((t) => {
                const isSelected = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onUpdateSettings({ theme: t.id })}
                    style={{ backgroundColor: t.bg, color: t.text }}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between h-20 transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'ring-2 ring-[var(--accent)] border-transparent shadow-sm'
                        : 'border-[var(--border-color)] hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <span style={{ color: t.accent }}>{t.icon}</span>
                        <span>{t.label}</span>
                      </div>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] opacity-70 font-sans truncate">
                      {t.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Typeface Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-dim block mb-2 font-sans">
              Typeface
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {fontFamilies.map((f) => {
                const isSelected = settings.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onUpdateSettings({ fontFamily: f.id })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20 bg-[var(--accent-bg)]/20'
                        : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm font-bold text-main ${f.id === 'serif' ? 'font-serif' : 'font-sans'}`}>
                        {f.label}
                      </span>
                      {isSelected && <Check size={14} className="text-gold" />}
                    </div>
                    <p className="text-[11px] text-dim font-sans leading-tight">
                      {f.sub}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Text Size */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-dim font-sans">
                Lyric Text Size
              </label>
              <span className="text-xs font-mono font-bold text-gold uppercase px-2 py-0.5 rounded-md bg-[var(--bg-surface-alt)] border border-[var(--border-color)]">
                {settings.fontSize.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[var(--bg-surface-alt)] border border-[var(--border-color)] p-1 rounded-2xl">
              {fontSizes.map((s) => {
                const isSelected = settings.fontSize === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onUpdateSettings({ fontSize: s.id })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? 'bg-[var(--accent)] text-white shadow-xs'
                        : 'text-dim hover:text-main hover:bg-[var(--bg-surface)]'
                    }`}
                  >
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Line Spacing & Text Alignment */}
          <div className="grid grid-cols-2 gap-3">
            {/* Line Spacing */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-dim block mb-2 font-sans">
                Line Spacing
              </label>
              <div className="flex flex-col gap-1 bg-[var(--bg-surface-alt)] border border-[var(--border-color)] p-1 rounded-2xl">
                {lineHeights.map((lh) => {
                  const isSelected = settings.lineHeight === lh.id;
                  return (
                    <button
                      key={lh.id}
                      onClick={() => onUpdateSettings({ lineHeight: lh.id })}
                      className={`py-1.5 px-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--accent)] text-white font-bold shadow-xs'
                          : 'text-dim hover:text-main'
                      }`}
                    >
                      <span>{lh.label}</span>
                      <span className="font-mono text-[10px] opacity-80">{lh.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Alignment */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-dim block mb-2 font-sans">
                Alignment
              </label>
              <div className="flex gap-1 bg-[var(--bg-surface-alt)] border border-[var(--border-color)] p-1 rounded-2xl h-[94px] items-center">
                <button
                  onClick={() => onUpdateSettings({ textAlign: 'left' })}
                  className={`flex-1 h-full rounded-xl flex flex-col items-center justify-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                    settings.textAlign === 'left'
                      ? 'bg-[var(--accent)] text-white shadow-xs'
                      : 'text-dim hover:text-main hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <AlignLeft size={16} />
                  <span>Left</span>
                </button>
                <button
                  onClick={() => onUpdateSettings({ textAlign: 'center' })}
                  className={`flex-1 h-full rounded-xl flex flex-col items-center justify-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                    settings.textAlign === 'center'
                      ? 'bg-[var(--accent)] text-white shadow-xs'
                      : 'text-dim hover:text-main hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <AlignCenter size={16} />
                  <span>Center</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Keep Screen Awake Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] shadow-xs">
            <div className="pr-3">
              <div className="text-xs font-bold text-main">
                Prevent Display Sleep
              </div>
              <div className="text-[11px] text-dim font-sans mt-0.5">
                Keeps screen awake during worship singing
              </div>
            </div>
            <button
              type="button"
              onClick={() => onUpdateSettings({ keepScreenAwake: !settings.keepScreenAwake })}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 shrink-0 ${
                settings.keepScreenAwake ? 'bg-[var(--accent)]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label="Toggle Prevent Screen Sleep"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.keepScreenAwake ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reset Defaults */}
          <div className="pt-1 flex justify-center">
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] text-[11px] font-semibold text-dim hover:text-rose-500 hover:border-rose-300 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Restore Defaults</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-header)] flex items-center justify-between text-xs text-dim">
          <span className="font-serif italic text-xs">
            Psalms & Hymns
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypographyDrawer;
