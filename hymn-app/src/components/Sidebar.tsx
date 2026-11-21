import React from 'react';
import {
  Music,
  ListFilter,
  Bookmark,
  Sun,
  BookOpen,
  Anchor,
  Hash,
  X,
  Settings,
} from 'lucide-react';
import type { AppViewTab } from '../types/hymn';
import appLogo from '../assets/app-icon.png';

interface SidebarProps {
  currentTab: AppViewTab;
  onSelectTab: (tab: AppViewTab) => void;
  onOpenScriptureDrawer: () => void;
  onOpenDialPad: () => void;
  favoritesCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenScriptureDrawer,
  onOpenDialPad,
  favoritesCount,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems: { id: AppViewTab; label: string; icon: any; badge?: string | number }[] = [
    { id: 'hymns', label: '500 Psalms & Hymns', icon: Music },
    { id: 'bible', label: 'Holy Bible', icon: BookOpen },
    { id: 'search', label: 'A–Z Index', icon: ListFilter },
    { id: 'saved', label: 'Bookmarks & History', icon: Bookmark, badge: favoritesCount > 0 ? favoritesCount : undefined },
    { id: 'devotions', label: 'Daily Morning Manna', icon: Sun },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[var(--bg-surface)] border-r border-[var(--border-color)] select-none transition-colors">
      {/* Brand Identity */}
      <div className="p-5 border-b border-[var(--border-color)] flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={appLogo}
            alt="The Believer’s Companion Logo"
            className="w-9 h-9 rounded-xl object-cover shadow-xs"
          />
          <div className="min-w-0">
            <h1 className="text-base font-serif font-bold text-main leading-tight tracking-tight">
              The Believer’s Companion
            </h1>
            <p className="text-[11px] text-dim truncate font-sans">
              Hymns, Scripture &amp; Devotions
            </p>
          </div>
        </div>
        {isOpenMobile && onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-full text-dim hover:text-main hover:bg-[var(--bg-surface-alt)] cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'hymns' && currentTab === 'home');

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                if (isOpenMobile && onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent-bg)] text-gold font-bold shadow-xs'
                  : 'text-sub hover:bg-[var(--bg-surface-alt)] hover:text-main font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={17} className={isActive ? 'text-gold' : 'text-dim'} />
                <span className="font-sans">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent)] text-white font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 border-t border-[var(--border-color)] my-2" />

        {/* Quick Keypad Jump Button */}
        <button
          onClick={() => {
            onOpenDialPad();
            if (isOpenMobile && onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-sub hover:bg-[var(--bg-surface-alt)] hover:text-main transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Hash size={17} className="text-gold" />
            <span className="font-sans">Keypad Jump (#)</span>
          </div>
          <span className="text-[10px] font-mono text-dim">1–500</span>
        </button>

        {/* Biblical Anchors Drawer */}
        <button
          onClick={() => {
            onOpenScriptureDrawer();
            if (isOpenMobile && onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-sub hover:bg-[var(--bg-surface-alt)] hover:text-main transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Anchor size={17} className="text-gold" />
            <span className="font-sans">Biblical Anchors</span>
          </div>
          <span className="text-[10px] font-mono text-dim">10 Doctrines</span>
        </button>
      </div>

      {/* Subtle Offline Footer Tag */}
      <div className="p-3.5 border-t border-[var(--border-color)] text-center text-[10px] text-dim space-y-0.5">
        <div className="font-mono">Offline Ready • 500 Hymns</div>
        <div className="font-sans text-[9.5px] opacity-80">
          Copyright &copy; 2026 Chukwuemeka Nnaji (Nnajitec)
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isOpenMobile && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={onCloseMobile}
        >
          <div
            className="w-72 max-w-[85vw] h-full shadow-2xl animate-slide-right"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
