import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme, currentTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button
        onClick={() => setTheme('light')}
        className={`theme-button ${theme === 'light' ? 'active' : ''}`}
        style={{
          backgroundColor: theme === 'light' ? currentTheme.accent : currentTheme.card,
          color: theme === 'light' ? '#ffffff' : currentTheme.text
        }}
      >
        Light
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
        style={{
          backgroundColor: theme === 'dark' ? currentTheme.accent : currentTheme.card,
          color: theme === 'dark' ? '#ffffff' : currentTheme.text
        }}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`theme-button ${theme === 'system' ? 'active' : ''}`}
        style={{
          backgroundColor: theme === 'system' ? currentTheme.accent : currentTheme.card,
          color: theme === 'system' ? '#ffffff' : currentTheme.text
        }}
      >
        System
      </button>
    </div>
  );
};

export default ThemeSwitcher;
