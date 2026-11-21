import React from 'react';
import { Home, Search, Sun, BookOpen, Anchor } from 'lucide-react';
import type { AppViewTab } from '../types/hymn';

export interface BottomNavProps {
  currentTab: AppViewTab;
  onSelectTab: (tab: AppViewTab) => void;
  onOpenScripture?: () => void;
  isScriptureOpen?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenScripture,
  isScriptureOpen = false,
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bible', label: 'Bible', icon: BookOpen },
    { id: 'devotions', label: 'Manna', icon: Sun },
    { id: 'anchor', label: 'Bible Anchor', icon: Anchor, isAction: true },
    { id: 'search', label: 'Index', icon: Search },
  ];

  return (
    <div
      className="lg:hidden fixed inset-x-0 z-30 flex justify-center pointer-events-none px-2 sm:px-4 select-none"
      style={{
        bottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
      }}
    >
      <nav
        role="navigation"
        aria-label="Bottom Navigation"
        className="pointer-events-auto floating-dock backdrop-blur-xl flex items-center justify-around gap-0.5 px-1.5 sm:px-3 py-1.5 rounded-full max-w-[440px] w-full transition-all border border-[var(--border-color)] bg-[var(--bg-floating)] shadow-[var(--shadow-dock)] h-14"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.isAction
            ? isScriptureOpen
            : !isScriptureOpen &&
              ((tab.id === 'home' && (currentTab === 'hymns' || currentTab === 'home')) ||
                currentTab === tab.id);

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.isAction) {
                  onOpenScripture?.();
                } else if (tab.id === 'home') {
                  onSelectTab('home');
                } else {
                  onSelectTab(tab.id as AppViewTab);
                }
              }}
              className={`relative flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-full transition-all cursor-pointer min-w-0 ${
                isActive
                  ? 'text-[var(--accent)] font-bold'
                  : 'text-dim hover:text-main'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 1.75}
                  className={isActive ? 'text-[var(--accent)]' : 'text-current'}
                />
              </div>
              <span
                className={`text-[9.5px] sm:text-[10px] tracking-tight mt-1 font-sans leading-none truncate max-w-full ${
                  isActive ? 'text-[var(--accent)] font-bold' : 'text-dim'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
