import { useContext, useCallback, memo } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './style.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleToggle = useCallback(toggleTheme, [toggleTheme]);

  return (
    <button
      type="button"
      className={classNames(styles.toggleBtn, isDark && styles.dark)}
      onClick={handleToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
      title={isDark ? 'Dark mode' : 'Light mode'}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default memo(ThemeToggle);
