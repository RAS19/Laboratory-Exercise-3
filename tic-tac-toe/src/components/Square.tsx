import React from 'react';
import type { SquareProps } from '../types/gameTypes';

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button 
      className="square" 
      onClick={onSquareClick}
      data-value={value}
      aria-label={value ? `${value} square` : 'Empty square'}
    >
      {value}
    </button>
  );
};

export default Square;