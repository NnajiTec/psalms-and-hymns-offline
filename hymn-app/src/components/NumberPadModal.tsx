import React, { useState, useEffect } from 'react';
import { X, Delete, ArrowRight, Hash, Music } from 'lucide-react';
import type { Hymn } from '../types/hymn';
import { getHymnByNumber, parseMeterAndTune } from '../services/search';

interface NumberPadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHymn: (hymn: Hymn) => void;
}

export const NumberPadModal: React.FC<NumberPadModalProps> = ({
  isOpen,
  onClose,
  onSelectHymn,
}) => {
  const [digits, setDigits] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setDigits('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentNumber = digits ? parseInt(digits, 10) : null;
  const matchedHymn = currentNumber ? getHymnByNumber(currentNumber) : null;

  const handleDigit = (d: number) => {
    if (digits.length >= 3) return;
    const next = digits + d.toString();
    const val = parseInt(next, 10);
    if (val <= 500) {
      setDigits(next);
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };

  const handleBackspace = () => {
    setDigits((prev) => prev.slice(0, -1));
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleClear = () => {
    setDigits('');
  };

  const handleGo = () => {
    if (matchedHymn) {
      onSelectHymn(matchedHymn);
      onClose();
    }
  };

  const parsed = matchedHymn ? parseMeterAndTune(matchedHymn.meter) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-t-3xl sm:rounded-3xl shadow-[var(--shadow-dock)] p-6 flex flex-col gap-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div>
            <h2 className="text-base font-bold text-main flex items-center gap-1.5 font-serif">
              <Hash size={18} className="text-gold" />
              <span>Keypad Jump</span>
            </h2>
            <p className="text-xs text-dim font-sans">
              Enter hymn number (1 – 500)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Display / Live Preview Box */}
        <div className="bg-[var(--bg-surface-alt)] border border-[var(--border-color)] rounded-2xl p-4 min-h-[96px] flex flex-col justify-center text-center shadow-xs">
          <div className="text-4xl font-mono font-extrabold text-gold tracking-wider leading-none">
            {digits ? `#${digits}` : '—'}
          </div>

          {matchedHymn ? (
            <div className="mt-2.5 animate-fade-in">
              <div className="text-base font-serif font-semibold text-main truncate max-w-xs mx-auto">
                {matchedHymn.title}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-dim mt-1 font-sans">
                {parsed?.tune && (
                  <span className="inline-flex items-center gap-1 text-gold font-medium">
                    <Music size={11} />
                    <span>{parsed.tune}</span>
                  </span>
                )}
                {parsed?.meter && <span className="font-mono text-[11px]">{parsed.meter}</span>}
                <span>•</span>
                <span>{matchedHymn.verseCount} verses</span>
              </div>
            </div>
          ) : digits ? (
            <div className="text-xs text-rose-500 font-semibold mt-2 font-sans">
              Hymn number exceeds 500
            </div>
          ) : (
            <div className="text-xs text-dim mt-2 font-sans">
              Type 1 to 500 using the keypad
            </div>
          )}
        </div>

        {/* Numeric Keypad Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="h-12 sm:h-13 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-main hover:border-[var(--accent)] hover:text-gold text-xl font-mono font-bold flex items-center justify-center transition-all duration-100 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-xs"
            >
              {num}
            </button>
          ))}

          {/* Clear button */}
          <button
            onClick={handleClear}
            className="h-12 sm:h-13 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-bold text-dim hover:text-rose-500 hover:bg-rose-500/10 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            Clear
          </button>

          {/* Zero */}
          <button
            onClick={() => handleDigit(0)}
            className="h-12 sm:h-13 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-main hover:border-[var(--accent)] hover:text-gold text-xl font-mono font-bold flex items-center justify-center transition-all duration-100 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-xs"
          >
            0
          </button>

          {/* Backspace */}
          <button
            onClick={handleBackspace}
            className="h-12 sm:h-13 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-dim hover:text-main flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            title="Backspace"
            aria-label="Backspace"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Primary Open CTA */}
        <button
          onClick={handleGo}
          disabled={!matchedHymn}
          className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-150 shadow-sm cursor-pointer ${
            matchedHymn
              ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white hover:scale-[1.01] active:scale-95'
              : 'bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-dim opacity-50 cursor-not-allowed'
          }`}
        >
          <span>Open Hymn</span>
          {matchedHymn && <span className="font-mono">#{matchedHymn.number}</span>}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default NumberPadModal;
