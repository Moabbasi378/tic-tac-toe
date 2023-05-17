import React, { useState } from "react";

enum Player {
  None = "",
  X = "X",
  O = "O",
}

const initialBoard = Array(9).fill(Player.None);

export const Board: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(Player.X);
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningCombination, setWinningCombination] = useState<number[]>([]);

  const handleCellClick = (index: number) => {
    if (board[index] === Player.None && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === Player.X ? Player.O : Player.X);
      checkWinner(newBoard, index);
    }
  };

  const checkWinner = (currentBoard: Player[], lastIndex: number) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] === currentBoard[b] &&
        currentBoard[b] === currentBoard[c] &&
        currentBoard[a] !== Player.None
      ) {
        setWinner(currentBoard[a]);
        setWinningCombination(combination);
        break;
      }
    }

    // If all cells are filled and no winner is found
    if (!currentBoard.includes(Player.None) && !winner) {
      setWinner(Player.None);
    }
  };

  const renderCell = (index: number) => {
    const isWinningCell = winningCombination.includes(index);

    return (
      <div
        key={index}
        className={`w-16 h-16 flex items-center justify-center border border-gray-400 text-white cursor-pointer text-4xl ${
          isWinningCell ? "text-green-500" : ""
        }`}
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer(Player.X);
    setWinner(null);
    setWinningCombination([]);
  };

  let message;
  if (winner === Player.None) {
    message = "It's a draw!";
  } else if (winner) {
    message = `Player ${winner} wins!`;
  } else {
    message = `Current Player: ${currentPlayer}`;
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen Board">
      <h1 className="text-4xl font-bold my-8 text-center text-white">
        Tic Tac Toe
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {board.map((_, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center border border-gray-400 text-white cursor-pointer text-4xl Cell ${
              winningCombination.includes(index) ? "WinningCell" : ""
            }`}
            onClick={() => handleCellClick(index)}
          >
            {board[index]}
          </div>
        ))}
      </div>
      <div className="w-48 h-48 flex justify-center items-center"></div>
      <p
        className={`text-2xl my-4 text-white ${
          winner === Player.None ? "DrawMessage" : ""
        }`}
      >
        {winner === Player.None
          ? "It's a draw!"
          : winner
          ? `Player ${winner} wins!`
          : `Current Player: ${currentPlayer}`}
      </p>
      <button
        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ResetButton"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};
