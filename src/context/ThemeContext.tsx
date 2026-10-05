import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isLargeText: boolean;
  toggleLargeText: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('glb_theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return false; // Default explicitly to light mode
  });

  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    return localStorage.getItem('glb_large_text') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('glb_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('glb_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('text-lg-mode');
      localStorage.setItem('glb_large_text', 'true');
    } else {
      document.documentElement.classList.remove('text-lg-mode');
      localStorage.setItem('glb_large_text', 'false');
    }
  }, [isLargeText]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleLargeText = () => setIsLargeText((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isLargeText, toggleLargeText }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
