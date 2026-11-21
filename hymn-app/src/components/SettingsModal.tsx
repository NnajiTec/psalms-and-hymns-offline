import React from 'react';
import { X, Sun, Moon, Check, AlignLeft, AlignCenter } from 'lucide-react';
import type { AppSettings, ThemeMode, FontSize, FontFamily, LineHeight } from '../types/hymn';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeMode; label: string; icon: React.ReactNode; bg: string; text: string }[] = [
    { id: 'light', label: 'Warm Ivory', icon: <Sun size={16} />, bg: '#F7F4ED', text: '#182238' },
    { id: 'dark', label: 'Midnight Navy', icon: <Moon size={16} />, bg: '#111726', text: '#F7F4ED' },
  ];

  const fontSizes: { id: FontSize; label: string }[] = [
    { id: 'sm', label: 'S' },
    { id: 'md', label: 'M' },
    { id: 'lg', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: '2xl', label: '2XL' },
  ];

  const fontFamilies: { id: FontFamily; label: string }[] = [
    { id: 'serif', label: 'Lora Serif' },
    { id: 'sans', label: 'Plus Jakarta' },
  ];

  const lineHeights: { id: LineHeight; label: string }[] = [
    { id: 'normal', label: 'Compact' },
    { id: 'relaxed', label: 'Relaxed' },
    { id: 'loose', label: 'Spacious' },
  ];

  return (
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
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-floating)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Settings
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Appearance & reading preferences
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Theme Section */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
            Color Theme
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {themes.map((t) => {
              const isSelected = settings.theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onUpdateSettings({ theme: t.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: t.bg,
                    color: t.text,
                    border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isSelected ? <Check size={16} color="var(--accent)" /> : t.icon}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 500 }}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Family Section */}
        <div>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
            Typeface
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {fontFamilies.map((f) => {
              const isSelected = settings.fontFamily === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onUpdateSettings({ fontFamily: f.id })}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-alt)',
                    border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{f.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Size Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Text Size
            </label>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)' }}>
              {settings.fontSize.toUpperCase()}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface-alt)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '4px',
            }}
          >
            {fontSizes.map((s) => {
              const isSelected = settings.fontSize === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onUpdateSettings({ fontSize: s.id })}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                    color: isSelected ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Line Height & Alignment */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Line Spacing
            </label>
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--bg-surface-alt)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                padding: '4px',
              }}
            >
              {lineHeights.map((lh) => {
                const isSelected = settings.lineHeight === lh.id;
                return (
                  <button
                    key={lh.id}
                    onClick={() => onUpdateSettings({ lineHeight: lh.id })}
                    style={{
                      flex: 1,
                      padding: '8px 4px',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                      color: isSelected ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {lh.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Alignment
            </label>
            <div
              style={{
                display: 'flex',
                backgroundColor: 'var(--bg-surface-alt)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                padding: '4px',
              }}
            >
              <button
                onClick={() => onUpdateSettings({ textAlign: 'left' })}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: settings.textAlign === 'left' ? 'var(--accent)' : 'transparent',
                  color: settings.textAlign === 'left' ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlignLeft size={18} />
              </button>
              <button
                onClick={() => onUpdateSettings({ textAlign: 'center' })}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: settings.textAlign === 'center' ? 'var(--accent)' : 'transparent',
                  color: settings.textAlign === 'center' ? 'var(--accent-contrast)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlignCenter size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Keep Screen Awake Toggle */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '10px 14px',
            backgroundColor: 'var(--bg-surface-alt)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Keep Screen Awake
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Prevents sleep during singing
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.keepScreenAwake}
            onChange={(e) => onUpdateSettings({ keepScreenAwake: e.target.checked })}
            style={{ width: '18px', height: '18px', accentColor: 'var(--accent)', cursor: 'pointer' }}
          />
        </label>
      </div>
    </div>
  );
};

export default SettingsModal;
