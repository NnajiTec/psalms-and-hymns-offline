import React, { useState } from 'react';
import { WifiOff, X } from 'lucide-react';
import { useNetworkStatus } from '../services/network';

export const NetworkStatusBanner: React.FC = () => {
  const { isOnline } = useNetworkStatus();
  const [dismissed, setDismissed] = useState(false);

  // When online or dismissed, don't obstruct the viewport
  if (isOnline || dismissed) return null;

  return (
    <div
      style={{
        backgroundColor: '#7f1d1d',
        color: '#fef2f2',
        padding: '6px 16px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 200ms ease',
        borderBottom: '1px solid rgba(254, 202, 202, 0.2)',
        zIndex: 50,
      }}
      className="animate-fade-in"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <WifiOff size={14} color="#fca5a5" />
        <span>
          Offline Mode • All 500 hymns and Bible studies are available locally
        </span>
      </div>

      <button
        onClick={() => setDismissed(true)}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: '2px',
          opacity: 0.8,
        }}
        title="Dismiss Banner"
      >
        <X size={14} />
      </button>
    </div>
  );
};
