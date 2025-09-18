import React from 'react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => (
  <nav className="navbar">
    <div className="navbar-title">Tic Tac Toe Game</div>
    <div className="navbar-links">
      <button className={activeTab === 'home' ? 'active' : ''} onClick={() => onTabChange('home')}>Home</button>
      <button className={activeTab === 'about' ? 'active' : ''} onClick={() => onTabChange('about')}>About</button>
      <button className={activeTab === 'developer' ? 'active' : ''} onClick={() => onTabChange('developer')}>Developer</button>
    </div>
  </nav>
);

export default Navbar;