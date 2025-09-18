import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;