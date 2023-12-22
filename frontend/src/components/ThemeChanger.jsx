import { useState, useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeChanger = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    themeChange(false);
  }, []);

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  return (
    <button onClick={handleThemeChange}>
      Change Theme
    </button>
  );
};

export default ThemeChanger;