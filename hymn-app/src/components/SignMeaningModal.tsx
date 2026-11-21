import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface SignMeaningModalProps {
  isOpen: boolean;
  onClose: () => void;
  sign: string;
  meaning?: string;
  hymnNumber?: number;
}

export const SignMeaningModal: React.FC<SignMeaningModalProps> = ({
  isOpen,
  onClose,
  sign,
  meaning,
  hymnNumber,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasAsterisk = sign.includes('*');
  const hasObelisk = sign.includes('†');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in select-none"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-scale-in text-main"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-dialog-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 flex items-center justify-center font-mono font-black text-lg">
              {sign}
            </div>
            <div>
              <h3 id="sign-dialog-title" className="font-serif font-bold text-base sm:text-lg text-main leading-tight">
                {hasAsterisk && hasObelisk
                  ? 'Asterisk & Obelisk (*†)'
                  : hasAsterisk
                  ? 'Asterisk (*)'
                  : 'Obelisk (†)'}
              </h3>
              <p className="text-xs text-dim font-sans mt-0.5">
                {hymnNumber ? `Hymnal Designation for Hymn #${hymnNumber}` : 'Official Hymnal Sign'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-sub hover:text-main hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-hidden"
            aria-label="Close sign explanation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3.5 text-xs sm:text-sm font-sans leading-relaxed">
          {/* Asterisk explanation */}
          {hasAsterisk && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <span className="font-mono text-sm font-black">*</span>
                <span>Post-Ordinance Praise</span>
              </div>
              <p className="text-amber-900/90 dark:text-amber-100/90 italic font-serif text-[13px]">
                &ldquo;The asterisk indicates a hymn judged to be specially suitable for use immediately after the ordinance has been kept.&rdquo;
              </p>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                Sung in quiet reverent worship right after the bread and the cup are partaken at the Lord&apos;s Table.
              </p>
            </div>
          )}

          {/* Obelisk explanation */}
          {hasObelisk && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
              <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <span className="font-mono text-sm font-black">†</span>
                <span>Breaking of the Loaf Exclusive</span>
              </div>
              <p className="text-amber-900/90 dark:text-amber-100/90 italic font-serif text-[13px]">
                &ldquo;The obelisk indicates that the hymn or verse to which it is affixed is not suitable for use at meetings other than that for the breaking of the loaf.&rdquo;
              </p>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                Prescribed exclusively for the Remembrance Meeting; not intended for general ministry or gospel gatherings.
              </p>
            </div>
          )}

          {/* Specific Hymnal Note if provided */}
          {meaning && (
            <div className="p-3 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-color)] text-sub text-[11px] leading-relaxed">
              <span className="font-semibold text-main">Note: </span>
              {meaning}
            </div>
          )}

          {/* Citation note */}
          <div className="pt-1 text-[11px] text-dim border-t border-[var(--border-color)]">
            Source: <span className="italic">Psalms, Hymns and Spiritual Songs</span>, Explanation of Signs Used.
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center gap-1.5"
          >
            <Check size={16} />
            <span>Got It</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignMeaningModal;
