'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Context for managing application theme (light/dark mode).
 * @type {React.Context<{darkMode: boolean, toggleDarkMode: () => void}>}
 */
const ThemeContext = createContext();

/**
 * ThemeProvider component that manages the application's theme state and provides
 * theme-related functionality to child components.
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components that will have access to the theme context
 * @returns {React.ReactElement} The ThemeProvider component
 */
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /**
   * Toggles between dark and light theme modes and persists the preference.
   * @type {() => void}
   */
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', newMode);
      }
      return newMode;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access the theme context.
 * 
 * @returns {{darkMode: boolean, toggleDarkMode: () => void}} Theme context with darkMode state and toggle function
 * @throws {Error} If used outside of a ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
