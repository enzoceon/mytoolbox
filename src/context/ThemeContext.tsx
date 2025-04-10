
import React, { createContext, useContext, useEffect } from 'react';

type ThemeContextType = {
  theme: 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always enforce dark theme
  useEffect(() => {
    // Update the document class for dark mode
    const root = window.document.documentElement;
    root.classList.add('dark');
    
    // Save the preference to localStorage
    localStorage.setItem('theme', 'dark');
  }, []);

  // Dummy toggle function that does nothing since we only support dark theme
  const toggleTheme = () => {
    // Do nothing - we're always in dark mode
    console.log('Dark mode is permanently enabled');
  };

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
