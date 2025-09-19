import { useState } from 'react';
import Board from './components/Board';
import Navbar from './components/Navbar';
import type { SquareValue } from './types/gameTypes';
import './App.css';

function App() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleResetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const moves = history.map((_, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => setCurrentMove(move)}>{description}</button>
      </li>
    );
  });

  let content;
  if (activeTab === 'home') {
    content = (
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            onPlayAgain={handleResetGame}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  } else if (activeTab === 'about') {
    content = (
      <div className="about">
        <h2>Tic Tac Toe</h2>
        <p>
          Tic Tac Toe, also known as Noughts and Crosses, is a classic game dating back to ancient Egypt.
          The modern version became popular in the 19th century. It is a simple strategy game played on a 3x3 grid,
          where two players take turns marking X and O, aiming to get three in a row.
        </p>
      </div>
    );
  } else if (activeTab === 'developer') {
    content = (
      <div className="developer">
        <h2>Developer Information</h2>
        <p>
          This Tic Tac Toe game was created by [Your Name].<br />
          Contact: [your.email@example.com]
        </p>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
      />
      {content}
    </div>
  );
}

export default App;