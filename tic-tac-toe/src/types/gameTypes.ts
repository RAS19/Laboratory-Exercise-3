export type SquareValue = 'X' | 'O' | null;

export type BoardSquares = SquareValue[];

export interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

export interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
}

export interface GameMove {
  squares: BoardSquares;
  move: number;
}