import React, { useState } from "react";
import Board from "./Board";
import PopUp from "./PopUp";
import GetCleverMoves from "./GetCleverMoves";
type BoardArray = Array<Array<string | null>>;

const checkWinner = (board: BoardArray): string | null => {
  const lines = [
    //ROWS
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    //COLS
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    //DIAGONALS
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  return null;
};

const TicTacToe = () => {
  const initialBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => null)
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isNoWinner, setIsNoWinner] = useState<boolean>(false);

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer("X");
    setWinner(null);
    setIsNoWinner(false);
  };

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return;
    }
    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === col ? player : cell
      )
    );
    setBoard(updatedPlayerBoard);
    const newWinner = checkWinner(updatedPlayerBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }
    setPlayer("X");
    const hasNullValue = updatedPlayerBoard.some((row) =>
      row.some((cell) => cell === null)
    );

    if (!winner && !hasNullValue) {
      setIsNoWinner(true);
      return;
    }
    //computer's move
    if (!newWinner) {
      const nextPlayer = player === "X" ? "O" : "X";
      const bestMove = GetCleverMoves(
        updatedPlayerBoard,
        nextPlayer,
        checkWinner
      );

      // const newComputerWinner = checkWinner(updatedComputerBoard);
      // setWinner(newComputerWinner);
      // if (newComputerWinner) {
      //   return;
      // }
      setTimeout(() => {
        const aiBoard = updatedPlayerBoard.map((r, rowIndex) =>
          r.map((c, colIndex) =>
            rowIndex === bestMove?.[0] && colIndex === bestMove[1]
              ? nextPlayer
              : c
          )
        );
        setBoard(aiBoard);
        setWinner(checkWinner(aiBoard))
      }, 500);
    }
  };

  return (
    <div className="game">
      <h1> TicTacToe</h1>
      <Board board={board} handleClick={handleOnClick} />
      {(winner || isNoWinner) && (
        <PopUp winner={winner} isNoWinner={isNoWinner} onClose={restartGame} />
      )}
      <div className="button-container">
        <button className="reset" onClick={restartGame}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default TicTacToe;
