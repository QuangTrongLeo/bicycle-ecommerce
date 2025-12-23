import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './style.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <button
      className={[
        styles.toggleBtn,
        isDark && styles.dark
      ].filter(Boolean).join(' ')}
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className={styles.icon}>
        {isDark ? '🌞' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;
