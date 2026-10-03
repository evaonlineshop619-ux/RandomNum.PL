import React from 'react';
import { SlidersHorizontal, User, ShieldCheck, Zap } from 'lucide-react';

export type ActiveTab = 'number' | 'dice' | 'coin' | 'list' | 'cards';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onTriggerRoll: () => void;
  onOpenConfig: () => void;
  onOpenAudit: () => void;
  onOpenGithub?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onTriggerRoll,
  onOpenConfig,
  onOpenAudit,
  onOpenGithub,
}) => {
  return (
    <header className="border-b border-[#222a3d] bg-[#0b1326] sticky top-0 z-30 px-3 sm:px-6 py-2.5">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('number')}>
            {/* Connected circles quantum icon matching screenshot */}
            <div className="w-8 h-8 rounded-lg bg-[#171f33] border border-[#31394d] flex items-center justify-center p-1.5 shadow-inner">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#c0c1ff]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="12" cy="18" r="3" />
                <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
                <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
                <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-space font-bold text-base sm:text-lg tracking-tight text-white">Random</span>
                <span className="font-space font-bold text-base sm:text-lg tracking-tight text-[#c0c1ff]">Num.PL</span>
              </div>
              <div className="text-[10px] tracking-wider text-[#908fa0] uppercase font-mono leading-none">
                Telemetry v1.1
              </div>
            </div>
          </div>

          {/* Entropy indicator badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-[#131b2e] border border-[#222a3d] text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
            </span>
            <span className="text-[#908fa0] text-[11px]">ENTROPY:</span>
            <span className="text-[#dae2fd] text-[11px] font-semibold">TRNG-QUANTUM / 99.98%</span>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {[
            { id: 'number', label: 'Number Generator' },
            { id: 'dice', label: 'Dice Roller' },
            { id: 'coin', label: 'Coin Flip' },
            { id: 'list', label: 'List Shuffler' },
            { id: 'cards', label: 'Card Picker' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all relative ${
                  isActive
                    ? 'text-white bg-[#171f33] shadow-sm border border-[#31394d]'
                    : 'text-[#908fa0] hover:text-[#dae2fd] hover:bg-[#131b2e]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#c0c1ff] rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Quick trigger button matching screenshot */}
          <button
            onClick={onTriggerRoll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#171f33] hover:bg-[#222a3d] border border-[#31394d] text-xs font-mono text-[#dae2fd] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Trigger Sample (Spacebar / Enter)"
          >
            <Zap className="w-3.5 h-3.5 text-[#4edea3]" />
            <span className="font-semibold text-[11px] tracking-wide">TRIGGER</span>
            <span className="text-[10px] px-1 py-0.5 rounded bg-[#0b1326] text-[#908fa0] border border-[#222a3d]">
              SPACE / ENTER
            </span>
          </button>

          {/* GitHub Publish / Public Sync Button */}
          <button
            onClick={onOpenGithub}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#171f33] hover:bg-[#222a3d] border border-[#31394d] text-xs font-mono text-[#dae2fd] hover:text-white transition-all cursor-pointer shadow-sm"
            title="Public on GitHub / Git Repository"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden sm:inline font-semibold">GitHub</span>
          </button>

          {/* Config / filter icon button */}
          <button
            onClick={onOpenConfig}
            className="w-8 h-8 rounded bg-[#171f33] hover:bg-[#222a3d] border border-[#31394d] flex items-center justify-center text-[#908fa0] hover:text-[#dae2fd] transition-all cursor-pointer"
            title="Precision Config & Generator Parameters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* User / Audit icon button */}
          <button
            onClick={onOpenAudit}
            className="w-8 h-8 rounded-full bg-[#1e293b] hover:bg-[#2d3449] border border-[#31394d] flex items-center justify-center text-[#c0c1ff] transition-all cursor-pointer"
            title="NIST Verification & Entropy Diagnostics"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="flex md:hidden items-center justify-between gap-1 overflow-x-auto pt-2 mt-1 border-t border-[#222a3d]/60 no-scrollbar">
        {[
          { id: 'number', label: 'Numbers' },
          { id: 'dice', label: 'Dice' },
          { id: 'coin', label: 'Coin' },
          { id: 'list', label: 'Shuffler' },
          { id: 'cards', label: 'Cards' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap font-medium transition-all ${
                isActive
                  ? 'text-white bg-[#171f33] border border-[#31394d]'
                  : 'text-[#908fa0] hover:text-[#dae2fd]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
