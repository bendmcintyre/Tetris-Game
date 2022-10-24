//Declaring necessary variable to make the game run.
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

//This function below starts a new game.
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

//This function below allows users to click spots on the grid.
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

//This funciton below ends the game and determines a winner by relaying a message to the user.
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw!";
  } else {
    winningMessageText.innerText = `${playerOTurn ? "O's" : "X's"} wins!`;
  }
  winningMessageText.classList.add("show");
}

//This function below is used if the game ends in a tie between the players.
function isDraw() {
  return [...dataCell].every((cell) => {
    return cell.classList.contains(playerX) || cell.classList.contains(playerO);
  });
}

//This function below is used to place the correct X or O in a cell.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//This function below is used to swap turns between players.
function swapTurns() {
  playerOTurn = !playerOTurn;
}

//This function below allows the user to see thier X or O hover in the cells.
function setBoard() {
  board.classList.remove(playerX);
  board.classList.remove(playerO);
  if (playerOTurn) {
    board.classList.add(playerO);
  } else {
    board.classList.add(playerX);
  }
}

//This function below checks if the board matches the winning combinations declared above.
function checkWin(currentClass) {
  return winningPatterns.some((combination) => {
    return combination.every((index) => {
      return dataCell[index].classList.contains(currentClass);
    });
  });
}
