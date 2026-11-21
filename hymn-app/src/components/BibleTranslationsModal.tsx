import React, { useState, useEffect } from 'react';
import { X, Languages, Download, Trash2, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import {
  BIBLE_VERSIONS,
  type BibleVersion,
  isVersionDownloaded,
  downloadTranslation,
  deleteTranslation,
} from '../services/bibleService';

interface BibleTranslationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVersion: string;
  onSelectVersion: (versionId: string) => void;
}

export const BibleTranslationsModal: React.FC<BibleTranslationsModalProps> = ({
  isOpen,
  onClose,
  currentVersion,
  onSelectVersion,
}) => {
  const [downloadedMap, setDownloadedMap] = useState<Record<string, boolean>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const checkStatus = async () => {
    const map: Record<string, boolean> = {};
    for (const v of BIBLE_VERSIONS) {
      map[v.id] = await isVersionDownloaded(v.id);
    }
    setDownloadedMap(map);
  };

  useEffect(() => {
    if (isOpen) {
      checkStatus();
      setFeedbackMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = async (v: BibleVersion) => {
    if (downloadingId) return;
    setDownloadingId(v.id);
    setDownloadProgress(0);
    setFeedbackMsg(`Storing ${v.name} offline on your device...`);

    const success = await downloadTranslation(v.id, (pct) => {
      setDownloadProgress(pct);
    });

    setDownloadingId(null);
    if (success) {
      setDownloadedMap((prev) => ({ ...prev, [v.id]: true }));
      setFeedbackMsg(`${v.name} is now available 100% offline!`);
      setTimeout(() => setFeedbackMsg(null), 3000);
    } else {
      setFeedbackMsg(`Unable to store ${v.name}. Please try again.`);
      setTimeout(() => setFeedbackMsg(null), 4000);
    }
  };

  const handleDelete = async (v: BibleVersion) => {
    if (confirm(`Remove ${v.name} from offline storage? You can re-download it anytime.`)) {
      await deleteTranslation(v.id);
      setDownloadedMap((prev) => ({ ...prev, [v.id]: false }));
      if (currentVersion === v.id) {
        // Fallback to KJV or BSB
        const other = BIBLE_VERSIONS.find((item) => item.id !== v.id)?.id || 'kjv';
        onSelectVersion(other);
      }
      setFeedbackMsg(`${v.name} removed from device storage.`);
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs select-none transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[88vh] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up sm:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center text-gold">
              <Languages size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-main tracking-tight leading-tight">
                Bible Translations
              </h2>
              <p className="text-[11px] text-dim font-sans">
                5 Free, Public-Domain Translations • 100% Offline
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-surface-alt)] text-dim hover:text-main transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="px-5 py-2.5 bg-[var(--accent-bg)] border-b border-[var(--border-color)] text-xs text-gold flex items-center gap-2">
          <Sparkles size={14} className="shrink-0" />
          <span>Translations are stored locally on your device with 0 KB internet data cost.</span>
        </div>

        {/* Feedback / Toast */}
        {feedbackMsg && (
          <div className="px-5 py-2 bg-[var(--bg-surface-alt)] text-xs font-semibold text-main border-b border-[var(--border-color)] flex items-center gap-2">
            {downloadingId && <Loader2 size={13} className="animate-spin text-gold shrink-0" />}
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Translation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
          {BIBLE_VERSIONS.map((v) => {
            const isActive = currentVersion === v.id;
            const isDownloaded = !!downloadedMap[v.id];
            const isBusy = downloadingId === v.id;

            return (
              <div
                key={v.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-[var(--accent)] bg-[var(--accent-bg)]/30 shadow-xs'
                    : 'border-[var(--border-color)] bg-[var(--bg-surface-alt)] hover:border-[var(--accent)]/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[var(--accent)] text-white text-[11px] font-mono font-bold">
                        {v.code}
                      </span>
                      <h3 className="text-sm font-bold text-main font-serif truncate">
                        {v.name}
                      </h3>
                      <span className="text-[10px] text-dim font-mono">({v.year})</span>
                    </div>

                    <p className="text-[11px] font-semibold text-gold mb-1 font-sans">
                      {v.tag}
                    </p>
                    <p className="text-xs text-sub font-sans leading-relaxed">
                      {v.desc}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-dim">
                      <span>Size: {v.size}</span>
                      {isDownloaded && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 size={13} />
                          <span>Stored Offline</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {/* Active / Select */}
                    {isActive ? (
                      <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-bold tracking-wide shadow-xs">
                        Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectVersion(v.id);
                        }}
                        className="px-3 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-sub hover:text-main hover:border-[var(--accent)] text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      >
                        Select
                      </button>
                    )}

                    {/* Download / Delete */}
                    {isBusy ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-bg)] text-gold text-xs font-mono">
                        <Loader2 size={12} className="animate-spin" />
                        <span>{downloadProgress}%</span>
                      </div>
                    ) : isDownloaded ? (
                      <button
                        type="button"
                        onClick={() => handleDelete(v)}
                        className="p-1.5 text-dim hover:text-rose-500 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title={`Remove ${v.name} from offline storage`}
                        aria-label={`Remove ${v.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDownload(v)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent-bg)] text-gold border border-[var(--border-color)] hover:border-[var(--accent)] text-xs font-bold transition-all cursor-pointer shadow-xs"
                        title={`Download ${v.name} for offline storage`}
                      >
                        <Download size={13} />
                        <span>Save Offline</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar when downloading */}
                {isBusy && (
                  <div className="mt-3 w-full bg-[var(--border-color)] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[var(--accent)] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BibleTranslationsModal;
