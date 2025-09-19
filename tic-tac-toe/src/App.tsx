import { useState, useEffect } from 'react';
import Board from './components/Board';
import Navbar from './components/Navbar';
import type { SquareValue } from './types/gameTypes';
import './App.css';

function App() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleResetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  let content;
  if (activeTab === 'home') {
    const moves = history.map((_, move) => {
      const description = move ? `Go to move #${move}` : 'Go to game start';
      const isCurrentMove = move === currentMove;
      
      return (
        <li key={move} className={isCurrentMove ? 'current-move' : ''}>
          <button onClick={() => jumpTo(move)}>
            {isCurrentMove ? <strong>{description}</strong> : description}
          </button>
        </li>
      );
    });

    content = (
      <div className="game-container">
        <div className="game-board-section">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            onPlayAgain={handleResetGame}
          />
        </div>
        <div className="game-info-section">
          <div className="game-info-card">
            <h3>Game History</h3>
            <div className="moves-container">
              <ol>{moves}</ol>
            </div>
            <button 
              className="reset-button"
              onClick={handleResetGame}
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>
    );
  } else if (activeTab === 'about') {
    content = (
      <div className="content-card">
        <h2>Tic Tac Toe</h2>
        <div className="card-content">
          <p>
            Tic Tac Toe, also known as Noughts and Crosses, is a classic game dating back to ancient Egypt.
            The modern version became popular in the 19th century. It is a simple strategy game played on a 3x3 grid,
            where two players take turns marking X and O, aiming to get three in a row.
          </p>
          <div className="rules-section">
            <h3>How to Play</h3>
            <ul>
              <li>Players take turns placing their mark (X or O) in empty squares</li>
              <li>The first player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins</li>
              <li>If all 9 squares are full and no player has 3 in a row, the game is a draw</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (activeTab === 'developer') {
    content = (
      <div className="content-card">
        <h2>Developer Information</h2>
        <div className="card-content">
          <p>
            This Tic Tac Toe game was created by Ruel Angelo P. Sinday.<br />
            Contact: 21-1-02429@vsu.edu.ph
          </p>
          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <div className="tech-badges">
              <span className="tech-badge">React</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">CSS3</span>
              <span className="tech-badge">HTML5</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
      />
      <main className="main-content">
        {content}
      </main>
    </div>
  );
}

export default App;