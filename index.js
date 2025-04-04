let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");

function handleClick(e) {
  const index = parseInt(e.target.getAttribute("data-index"));

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusDisplay.textContent = `اللاعب ${currentPlayer} هو اللي كسب`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "تعادل";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `اللاعب ${currentPlayer} اللي عليه الدور`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusDisplay.textContent = `اللاعب ${currentPlayer} اللي عليه الدور`;

  cells.forEach(cell => {
    cell.textContent = "";
  });
}

// تفعيل الضغط على كل خانة
cells.forEach(cell => cell.addEventListener("click", handleClick));

// تفعيل زر إعادة التشغيل
restartButton.addEventListener("click", restartGame);
