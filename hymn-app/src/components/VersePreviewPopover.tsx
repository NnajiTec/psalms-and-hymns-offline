import React, { useState, useEffect } from 'react';
import { Maximize2, X, Link2, Copy, Check, Loader2, BookOpen } from 'lucide-react';
import { lookupScriptureText, type ScriptureLookupResult } from '../services/bibleService';

interface VersePreviewPopoverProps {
  reference: string;
  versionId?: string;
  onClose: () => void;
  onExpandToBible: (book: string, chapter: number, verse?: number) => void;
}

export const VersePreviewPopover: React.FC<VersePreviewPopoverProps> = ({
  reference,
  versionId = 'kjv',
  onClose,
  onExpandToBible,
}) => {
  const [data, setData] = useState<ScriptureLookupResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    lookupScriptureText(reference, versionId)
      .then((res) => {
        if (active) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reference, versionId]);

  const handleCopy = () => {
    if (!data) return;
    const text = `${data.reference}\n` +
      data.verses.map((v) => `${v.verseNum}. ${v.text}`).join('\n') +
      `\n— The Believer’s Companion (${versionId.toUpperCase()})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const versionLabel =
    versionId === 'kjv'
      ? 'Authorized King James Version (KJV)'
      : versionId === 'bsb'
      ? 'Berean Standard Bible (BSB)'
      : versionId.toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#162032] border border-white/15 rounded-2xl shadow-2xl p-4 sm:p-5 text-white flex flex-col space-y-3 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header matching Emmaus Bible screenshot */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400 font-sans">
              {data ? data.reference : reference}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Expand / Maximize Icon Button matching screenshot ⤢ */}
            {data && (
              <button
                type="button"
                onClick={() => onExpandToBible(data.book, data.chapter, data.startVerse)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Expand and read full chapter in Bible"
                aria-label="Expand in Bible"
              >
                <Maximize2 size={16} />
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Copy scripture"
              aria-label="Copy scripture"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Verse Content */}
        <div className="min-h-[80px] max-h-[50vh] overflow-y-auto pr-1">
          {loading ? (
            <div className="flex items-center justify-center py-6 text-white/50 gap-2">
              <Loader2 size={18} className="animate-spin text-gold" />
              <span className="text-xs font-sans">Loading scripture...</span>
            </div>
          ) : data && data.verses.length > 0 ? (
            <div className="font-serif text-white/95 text-sm sm:text-[15px] leading-relaxed space-y-2">
              <div className="flex items-start gap-2">
                <Link2 size={15} className="text-sky-400 shrink-0 mt-1 opacity-80" />
                <div className="space-y-1.5">
                  {data.verses.map((v) => (
                    <p key={v.verseNum}>
                      {data.verses.length > 1 && (
                        <span className="font-sans font-bold text-xs text-gold mr-1.5 select-none">
                          {v.verseNum}
                        </span>
                      )}
                      <span>{v.text}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center text-white/60 text-xs">
              <p>Scripture reference &ldquo;{reference}&rdquo; ready in reader.</p>
            </div>
          )}
        </div>

        {/* Footer attribution matching screenshot */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-sans">
          <span className="italic truncate max-w-[65%]">
            {versionLabel}
          </span>
          {data && (
            <button
              type="button"
              onClick={() => onExpandToBible(data.book, data.chapter, data.startVerse)}
              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <BookOpen size={13} />
              <span>Open in Bible</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersePreviewPopover;
