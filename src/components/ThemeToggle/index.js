import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './style.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className={`${styles.toggleBtn} ${theme === 'dark' ? styles.dark : ''}`} 
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
    >
      <span className={styles.icon}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className={styles.text}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  );
};

export default ThemeToggle;