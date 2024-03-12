
import React from 'react';
import { useDarkMode } from './DarkModeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      className={`p-2 rounded-full ${darkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
      onClick={toggleDarkMode}
    >
      {darkMode ? '🌞' : '🌜'}
    </button>
  );
};

export default DarkModeToggle;
