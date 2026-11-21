import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  KeyRound,
  CheckCircle2,
  Unlock,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { Book } from '../types/library';
import { bookstoreBooks } from '../data/libraryData';
import { isBookUnlocked, unlockBookLicense, saveDownload } from '../services/db';

interface BookstoreViewProps {
  onOpenBook: (book: Book) => void;
}

export const BookstoreView: React.FC<BookstoreViewProps> = ({ onOpenBook }) => {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [selectedBookForUnlock, setSelectedBookForUnlock] = useState<Book | null>(null);
  const [licenseCode, setLicenseCode] = useState('');
  const [unlockStatus, setUnlockStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Check unlocked state on load
  const loadUnlocked = async () => {
    const unlocked: string[] = [];
    for (const b of bookstoreBooks) {
      const isUn = await isBookUnlocked(b.id);
      if (isUn) unlocked.push(b.id);
    }
    setUnlockedIds(unlocked);
  };

  useEffect(() => {
    loadUnlocked();
  }, []);

  const handleAttemptUnlock = async () => {
    if (!selectedBookForUnlock) return;
    const clean = licenseCode.trim().toUpperCase();

    // Valid sample keys for side-loaded APK distribution:
    const VALID_KEYS = ['CHURCH2026', 'TRUTH100', 'FELLOWSHIP', 'GRACE', 'ASSEMBLY', 'LUXMOORE'];

    if (VALID_KEYS.includes(clean) || clean.startsWith('COG-')) {
      await unlockBookLicense(selectedBookForUnlock.id, clean);
      // Auto save to offline IndexedDB
      await saveDownload({
        id: selectedBookForUnlock.id,
        itemType: 'book',
        title: selectedBookForUnlock.title,
        author: selectedBookForUnlock.author,
        downloadedAt: Date.now(),
        fileSize: selectedBookForUnlock.fileSize,
        data: selectedBookForUnlock,
      });

      setUnlockStatus('success');
      await loadUnlocked();
      setTimeout(() => {
        setSelectedBookForUnlock(null);
        setLicenseCode('');
        setUnlockStatus('idle');
      }, 1500);
    } else {
      setUnlockStatus('error');
      setErrorMessage('Invalid voucher or license code. Please check your purchase receipt or contact your assembly literature secretary.');
    }
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        paddingBottom: '90px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="max-w-xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  backgroundColor: 'var(--badge-bg)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  textTransform: 'uppercase',
                }}
              >
                Direct Digital Distribution
              </span>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
                Church Bookstore & Literature Fund
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Independent APK side-load distribution. Unlock doctrinal commentaries and study volumes directly to your offline device.
              </p>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {bookstoreBooks.map((book) => {
            const isUnlocked = unlockedIds.includes(book.id);

            return (
              <div
                key={book.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: isUnlocked ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        backgroundColor: 'var(--badge-bg)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {book.category}
                    </span>

                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        color: isUnlocked ? 'var(--accent)' : 'var(--text-primary)',
                      }}
                    >
                      {isUnlocked ? 'UNLOCKED' : book.price}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                      marginBottom: '4px',
                    }}
                  >
                    {book.title}
                  </h3>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    By {book.author}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '16px',
                    }}
                  >
                    {book.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                  {isUnlocked ? (
                    <button
                      onClick={() => onOpenBook(book)}
                      className="btn-pressable"
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-contrast)',
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <BookOpen size={16} />
                      <span>Read Volume</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onOpenBook(book)}
                        className="btn-pressable"
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-surface-alt)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-color)',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Preview Sample
                      </button>

                      <button
                        onClick={() => {
                          setSelectedBookForUnlock(book);
                          setUnlockStatus('idle');
                          setLicenseCode('');
                        }}
                        className="btn-pressable"
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-contrast)',
                          border: 'none',
                          fontWeight: 800,
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <KeyRound size={15} />
                        <span>Unlock</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Unlock Modal */}
        {selectedBookForUnlock && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={() => setSelectedBookForUnlock(null)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '460px',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-floating)',
                padding: '24px',
                position: 'relative',
              }}
              className="animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={22} color="var(--accent)" />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Unlock E-Book
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBookForUnlock(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {selectedBookForUnlock.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Price: {selectedBookForUnlock.price} • By {selectedBookForUnlock.author}
                </div>
              </div>

              {unlockStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckCircle2 size={48} color="var(--accent)" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Book Successfully Unlocked!
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Saved to local offline IndexedDB storage.
                  </p>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Enter Voucher or License Key:
                  </label>
                  <input
                    type="text"
                    value={licenseCode}
                    onChange={(e) => {
                      setLicenseCode(e.target.value);
                      if (unlockStatus === 'error') setUnlockStatus('idle');
                    }}
                    placeholder="e.g. CHURCH2026, TRUTH100, or COG-XXXX"
                    style={{
                      width: '100%',
                      height: '46px',
                      padding: '0 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-app)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontWeight: 600,
                      outline: 'none',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                    }}
                  />

                  {unlockStatus === 'error' && (
                    <div style={{ fontSize: '12px', color: '#ef4444', marginBottom: '12px' }}>
                      {errorMessage}
                    </div>
                  )}

                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Tip: Vouchers are issued by assembly literature funds or upon direct contribution. Test code: <strong>CHURCH2026</strong>
                  </div>

                  <button
                    onClick={handleAttemptUnlock}
                    className="btn-pressable"
                    style={{
                      width: '100%',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-contrast)',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '10px',
                    }}
                  >
                    <Unlock size={18} />
                    <span>Verify & Unlock Offline</span>
                  </button>

                  <a
                    href="https://thechurchesofGod.info"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      padding: '8px',
                    }}
                  >
                    <span>Order literature license online</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
