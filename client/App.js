import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { useDarkMode } from './components/DarkModeContext';

const App = () => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;