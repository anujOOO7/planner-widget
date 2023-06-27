import React, { useEffect, useState } from "react";

export default function MyCustomWidget() {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const handleClick = (row, col) => {
    if (winner || board[row][col]) {
      return;
    }

    const updatedBoard = board.map((rowArr, rowIndex) => {
      if (rowIndex === row) {
        return rowArr.map((cell, colIndex) =>
          colIndex === col ? currentPlayer : cell
        );
      } else {
        return rowArr;
      }
    });

    setBoard(updatedBoard);
    checkWinner(updatedBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = (currentBoard) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        currentBoard[a[0]][a[1]] &&
        currentBoard[a[0]][a[1]] === currentBoard[b[0]][b[1]] &&
        currentBoard[a[0]][a[1]] === currentBoard[c[0]][c[1]]
      ) {
        setWinner(currentBoard[a[0]][a[1]]);
        return;
      }
    }

    if (currentBoard.flat().filter((cell) => cell === null).length === 0) {
      // It's a draw
      setWinner("draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(3).fill(Array(3).fill(null)));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const renderSquare = (row, col) => {
    return (
      <div className="cell" onClick={() => handleClick(row, col)}>
        {board[row][col]}
      </div>
    );
  };

  return (
    <div className="tic-tac-toe-widget">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "row",
          marginBottom: "3px",
        }}
      >
        <p>Tic-Tac-Toe</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {board.map((row, rowIndex) => (
          <div style={{ display: "flex" }} key={rowIndex}>
            {row.map((_, colIndex) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80px",
                  width: "80px",
                  border: "1px solid #ffffff4d",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
                key={colIndex}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {board[rowIndex][colIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        {winner ? (
          <div style={{ fontWeight: "bold" }}>
            {winner === "draw" ? "It's a draw😐!" : `Player ${winner} wins✌️!`}
          </div>
        ) : (
          <div>Current Player: {currentPlayer}</div>
        )}
        <button
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
