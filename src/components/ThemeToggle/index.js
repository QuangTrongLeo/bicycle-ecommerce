import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './style.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      className={[
        styles.toggleBtn,
        isDark && styles.dark
      ].filter(Boolean).join(' ')}
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      aria-pressed={isDark}
      aria-label="Toggle theme"
    >
      <span className={styles.icon}>
        {isDark ? '🌕' : '🌑'}
      </span>
    </button>
  );
};

export default ThemeToggle;
