//Declaring necessary variables below.
const xSymbol = "x";
const oSymbol = "circle";
const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winning-message-id");
const restartButton = document.getElementById("restart-button");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
let oTurn;

//This funciton below is called first to start the game.
startGame();

//Below is the restart button event listener.
restartButton.addEventListener("click", startGame);

//This function below is to start the game.
function startGame() {
  oTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(xSymbol);
    cell.classList.remove(oSymbol);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, {once: true});
  });
  setBoardHover();
  winningMessage.classList.remove("show");
}

//This function below allows X's and O's to be placed in the 9 grid spots.
function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? oSymbol : xSymbol;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHover();
  }
}

//This funciton below is used to display who won the game, or if it was a draw.
function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw!";
  } else {
    winningMessageText.innerText = `${oTurn ? "O's" : "X's"} Win!`;
  }
  winningMessage.classList.add("show");
}

//This funciton determines if the game was a draw.
function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(xSymbol) || cell.classList.contains(oSymbol);
  });
}

//This function below is used to place the X or O's in the grid.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//This function below is used to change turns between players.
function swapTurns() {
  oTurn = !oTurn;
}

//This function below is used to show the symbol in a grid space before a user clicks to place an X or O.
function setBoardHover() {
  board.classList.remove(xSymbol);
  board.classList.remove(oSymbol);
  if (oTurn) {
    board.classList.add(oSymbol);
  } else {
    board.classList.add(xSymbol);
  }
}

//This function below checks if the game matches any of the winning patterns declared above.
function checkWin(currentClass) {
  return winningPatterns.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
