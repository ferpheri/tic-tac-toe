import React from "react";
type BoardProps = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
};
const Board = ({ board, handleClick }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ""}`}
              onClick={() => handleClick(rowIndex, cellIndex)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Board;
