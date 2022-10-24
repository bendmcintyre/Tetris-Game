//Declaring necessary variable to make the game run
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
const dataCell = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winning-message");
const restartButton = document.getElementById("restart-button");
const winningMessageText = document.getElementById("winning-message-text");
let playerOTurn = false;

startGame();

restartButton.addEventListener("click", startGame);

//This function below starts a new game
function startGame() {
  playerOTurn = false;
  dataCell.forEach((cell) => {
    cell.classList.remove(playerX);
    cell.classList.remove(playerO);
    cell.removeEventListener("click", cellClick);
    cell.addEventListener("click", cellClick, { once: true });
  });
  setBoard();
  winningMessage.classList.remove("show");
}

//This function below allows users to click spots on the grid
function cellClick(e) {
  const cell = e.target;
  const currentClass = playerOTurn ? playerO : playerX;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    changeTurns();
    setBoard();
  }
}

//This funciton ends the game and determines a winner
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw!";
  } else {
    winningMessageText.innerText = `${playerOTurn ? "O's" : "X's"} wins!`;
  }
  winningMessageText.classList.add("show");
}
