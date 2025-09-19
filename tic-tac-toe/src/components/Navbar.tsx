import React from 'react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, darkMode, onDarkModeToggle }) => (
  <nav className="navbar">
    <div className="navbar-brand">
      <div className="navbar-title">Tic Tac Toe</div>
      <div className="navbar-subtitle">Classic Game</div>
    </div>
    <div className="navbar-links">
      <button 
        className={activeTab === 'home' ? 'active' : ''} 
        onClick={() => onTabChange('home')}
        aria-label="Home"
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-text">Home</span>
      </button>
      <button 
        className={activeTab === 'about' ? 'active' : ''} 
        onClick={() => onTabChange('about')}
        aria-label="About"
      >
        <span className="nav-icon">ℹ️</span>
        <span className="nav-text">About</span>
      </button>
      <button 
        className={activeTab === 'developer' ? 'active' : ''} 
        onClick={() => onTabChange('developer')}
        aria-label="Developer"
      >
        <span className="nav-icon">👨‍💻</span>
        <span className="nav-text">Developer</span>
      </button>
    </div>
    <button 
      className="dark-mode-toggle" 
      onClick={onDarkModeToggle}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  </nav>
);

export default Navbar;