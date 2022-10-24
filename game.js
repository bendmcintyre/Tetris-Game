const playerX = "x";
const playerO = "o";
const winningPatterns = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const dateCell = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winning-message");
const restartButton = document.getElementById("restart-button");
const winningMessageText = document.getElementById("winning-message-text");
let isPlayerOTurn = false;
