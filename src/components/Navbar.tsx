import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Sun,
  Moon,
  Type,
  User as UserIcon,
  LogOut,
  Bookmark,
  History,
  Shield,
  Menu,
  X,
  Languages
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  navigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme, isLargeText, toggleLargeText } = useTheme();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'translate', label: 'Translate' },
    { id: 'categories', label: 'Phrase Directory' },
    { id: 'about-languages', label: 'Gilgit Languages' },
    { id: 'feedback', label: 'Feedback' },
  ];

  const handleNav = (page: string) => {
    navigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <button
          onClick={() => handleNav('home')}
          className="text-left group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0F4C81] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[#0E9F8D] transition-colors">
            <Languages className="w-4 h-4" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Gilgit Language Bridge
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  active
                    ? 'text-[#0F4C81] dark:text-sky-400 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F4C81] dark:bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions & profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Accessibility Font Size Toggle */}
          <button
            onClick={toggleLargeText}
            title={isLargeText ? 'Default text size' : 'Enlarge text accessibility'}
            className={`p-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              isLargeText
                ? 'bg-[#0E9F8D]/15 text-[#0E9F8D] dark:bg-[#0E9F8D]/25'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
            <span className="hidden xl:inline text-[11px] font-bold">A+</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User authenticated menu or Login/Register buttons */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-slate-300 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#0F4C81] text-white flex items-center justify-center text-[11px] font-bold">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{user?.name}</span>
                {isAdmin && (
                  <span className="hidden sm:inline text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-mono">
                    Admin
                  </span>
                )}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                  <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
                    <p className="text-slate-500 truncate text-[11px]">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => handleNav('dashboard')}
                    className="w-full text-left px-3.5 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    Dashboard
                  </button>

                  <button
                    onClick={() => handleNav('profile')}
                    className="w-full text-left px-3.5 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    Profile Settings
                  </button>

                  <button
                    onClick={() => handleNav('favourites')}
                    className="w-full text-left px-3.5 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                    Saved Phrases
                  </button>

                  <button
                    onClick={() => handleNav('history')}
                    className="w-full text-left px-3.5 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <History className="w-3.5 h-3.5 text-sky-500" />
                    Translation History
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => handleNav('admin')}
                      className="w-full text-left px-3.5 py-2 flex items-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-medium"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Admin Control Panel
                    </button>
                  )}

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      handleNav('home');
                    }}
                    className="w-full text-left px-3.5 py-2 flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => handleNav('register')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F4C81] hover:bg-[#0d3f6a] rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
                currentPage === item.id
                  ? 'bg-slate-100 dark:bg-slate-800 text-[#0F4C81] dark:text-sky-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNav('favourites')}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                Saved Favourites
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-amber-600 dark:text-amber-400"
                >
                  Admin Panel
                </button>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};
