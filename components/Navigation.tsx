
import React from 'react';
import { View } from '../types';
import ThemeToggle from './ThemeToggle';

interface NavButtonProps {
  label: View;
  activeView: View;
  onClick: () => void;
  badgeCount?: number;
}

const NavButton: React.FC<NavButtonProps> = ({ label, activeView, onClick, badgeCount }) => {
  const isActive = label === activeView;
  const activeClasses = 'bg-indigo-500 text-white shadow-md';
  const inactiveClasses = 'bg-white hover:bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600';

  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {badgeCount}
        </span>
      )}
    </button>
  );
};

interface NavigationProps {
  activeView: View;
  setActiveView: (view: View) => void;
  lowStockCount: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView, lowStockCount, theme, toggleTheme }) => {
  const views: View[] = ['Inventory', 'Low Stocks', 'Add Item', 'Outbound', 'History', 'Reports', 'Export Image', 'Data Management'];

  return (
    <header className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <div className="relative flex items-center justify-center py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Ztockify
          </h1>
          <div className="absolute right-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
        <div className="flex justify-center border-t border-slate-200 dark:border-slate-700">
          <nav className="flex items-center space-x-1 p-1 sm:p-2 overflow-x-auto">
            {views.map(view => (
              <NavButton
                key={view}
                label={view}
                activeView={activeView}
                onClick={() => setActiveView(view)}
                badgeCount={view === 'Low Stocks' ? lowStockCount : undefined}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
