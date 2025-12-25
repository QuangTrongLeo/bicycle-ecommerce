import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const getInitialTheme = () => {
  const saved = localStorage.getItem('app-theme');
  if (saved) return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);

    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
