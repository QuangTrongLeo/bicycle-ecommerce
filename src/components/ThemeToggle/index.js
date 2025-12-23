import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './style.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={[
        styles.toggleBtn,
        theme === 'dark' && styles.dark
      ].filter(Boolean).join(' ')}
      onClick={toggleTheme}
    >
      <span className={styles.icon}>
        {theme === 'light' ? '🌘' : '🌕'}
      </span>
      <span className={styles.text}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
