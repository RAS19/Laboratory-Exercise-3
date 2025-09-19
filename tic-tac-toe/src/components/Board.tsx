import React, { useState, useEffect } from 'react';
import Square from './Square';
import type { BoardProps } from '../types/gameTypes';
import { calculateWinner, checkDraw } from '../utils/gameUtils';

interface BoardPropsWithReset extends BoardProps {
  onPlayAgain?: () => void;
}

const Board: React.FC<BoardPropsWithReset> = ({ xIsNext, squares, onPlay, onPlayAgain }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);

  useEffect(() => {
    const winnerResult = calculateWinner(squares);
    if (winnerResult) {
      setWinner(winnerResult);
      setShowPopup(true);
      setIsDraw(false);
    } else if (checkDraw(squares)) {
      setShowPopup(true);
      setIsDraw(true);
      setWinner(null);
    }
  }, [squares]);

  function handleClick(i: number) {
    if (winner || squares[i] || checkDraw(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  function handlePlayAgain() {
    setShowPopup(false);
    setIsDraw(false);
    setWinner(null);
    if (onPlayAgain) onPlayAgain();
  }

  return (
    <>
      <div className="winner-title">
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : 'Tic Tac Toe'}
      </div>
      <div className="status">
        {winner || isDraw ? '' : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>{isDraw ? "It's a Draw!" : `Player ${winner} Wins!`}</h2>
            </div>
            <div className="popup-body">
              <div className="trophy-animation">
                {!isDraw && <div className="trophy">🏆</div>}
                {isDraw && <div className="draw-icon">🤝</div>}
              </div>
              <p>{isDraw ? 'No one wins this time. Try again!' : `Congratulations to Player ${winner}!`}</p>
            </div>
            <div className="popup-footer">
              <button className="play-again-btn" onClick={handlePlayAgain}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Board;