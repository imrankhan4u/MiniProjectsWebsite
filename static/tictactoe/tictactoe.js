let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const resultModal = document.getElementById("resultModal");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.querySelector("button");

const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
});

function handleClick(index) {
    if (gameOver || board[index] !== "") return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        showWinner();
    } else if (checkDraw()) {
        showDraw();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            animateWinningPath(pattern);
            return true;
        }
    }
    return false;
}

function checkDraw() {
    // If no empty spots left and no winner, it's a draw
    if (!board.includes("") && !checkWinner()) {
        return true;
    }
    return false;
}

function animateWinningPath(pattern) {
    pattern.forEach((index, i) => {
        setTimeout(() => {
            cells[index].classList.add("winner");
        }, i * 150); // Add a small delay between each winning cell highlight
    });
}

function showWinner() {
    resultMessage.textContent = `${currentPlayer} wins!`;

    // Delay the display of the result modal to allow winner path animation to finish
    setTimeout(() => {
        resultModal.style.display = "block"; // Show the modal after a short delay
    }, 1500); // Adjust delay as per the animation duration

    gameOver = true;
}

function showDraw() {
  resultMessage.textContent = "It's a draw!";
  resultMessage.classList.add("draw"); // Add draw styling to the result message

  resultModal.querySelector(".modal-content").classList.add("draw"); // Add draw styling to the modal

  // Show the result modal after a slight delay
  setTimeout(() => {
      resultModal.style.display = "block"; // Show the modal after a short delay
  }, 1500); // Adjust delay as per your preference

  gameOver = true;
}


function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    cells.forEach(cell => cell.textContent = "");
    cells.forEach(cell => cell.classList.remove("winner"));
    resultModal.style.display = "none";
}

restartButton.addEventListener("click", resetGame);
