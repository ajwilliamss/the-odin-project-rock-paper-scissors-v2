// Rock paper scissors
// Play until the user or computer wins 5 times

let winners = [];
const choices = ["rock", "paper", "scissors"];

// Select HTML elements
let playerChoiceEl = document.querySelector(".player-choice");
let computerChoiceEl = document.querySelector(".computer-choice");
let playerScoreEl = document.querySelector(".player-score");
let computerScoreEl = document.querySelector(".computer-score");
let tiesEl = document.querySelector(".ties");
let winnerEl = document.querySelector(".winner");
let resetEl = document.querySelector(".reset");

// Start the game
const startGame = () => {
  let images = document.querySelectorAll("img");
  images.forEach((img) =>
    img.addEventListener("click", () => {
      if (img.id) {
        currentRound(img.id);
      }
    })
  );
};

// Current round
const currentRound = (playerChoice) => {
  let numWins = checkWins();
  if (numWins >= 5) {
    return;
  }

  const computerChoice = computer();
  const winner = checkRoundWinner(playerChoice, computerChoice);
  winners.push(winner);
  countWins();
  roundOutput(playerChoice, computerChoice, winner);

  wins = checkWins();
  if (wins === 5) {
    // If wins are 5, display the result
    gameResult();
  }
};

// Computer selection
const computer = () => {
  const choice = choices[Math.floor(Math.random() * choices.length)];
  document.querySelector(`.${choice}`).classList.add("active");
  setTimeout(() => {
    document.querySelector(`.${choice}`).classList.remove("active");
  }, 700);
  return choice;
};

// Check round winner
const checkRoundWinner = (choice1, choice2) => {
  if (
    (choice1 === "rock" && choice2 === "scissors") ||
    (choice1 === "scissors" && choice2 === "paper") ||
    (choice1 === "paper" && choice2 === "rock")
  ) {
    return "User";
  } else if (choice1 === choice2) {
    return "Tie";
  } else {
    return "Computer";
  }
};

// Display the round result
const roundResult = (winner) => {
  if (winner === "User") {
    winnerEl.textContent = "You won the Round!";
  } else if (winner === "Computer") {
    winnerEl.textContent = "The Computer won the Round";
  } else {
    winnerEl.textContent = "The Round was a tie";
  }
};

// Round output
const roundOutput = (playerChoice, computerChoice, winner) => {
  playerChoiceEl.textContent = `You Chose: ${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }`;
  document.querySelector(
    ".computer-choice"
  ).textContent = `The Computer Chose: ${
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
  }`;
  roundResult(winner);
};

// Check wins
const checkWins = () => {
  const playerWins = winners.filter((item) => item === "User").length;
  const computerWins = winners.filter((item) => item === "Computer").length;
  return Math.max(playerWins, computerWins);
};

// Count user and computer wins
const countWins = () => {
  const playerWins = winners.filter((item) => item === "User").length;
  const computerWins = winners.filter((item) => item === "Computer").length;
  const ties = winners.filter((item) => item === "Tie").length;
  playerScoreEl.textContent = `Score: ${playerWins}`;
  document.querySelector(
    ".computer-score"
  ).textContent = `Score: ${computerWins}`;
  tiesEl.textContent = `Score: ${ties}`;
};

// Display the result
const gameResult = () => {
  let playerWins = winners.filter((item) => item === "User").length;

  if (playerWins === 5) {
    winnerEl.textContent = "You Won The Game!";
  } else {
    winnerEl.textContent = "Computer Wins The Game!";
  }
  resetEl.style.display = "flex";
};

// Reset game
const resetGame = () => {
  playerChoiceEl.textContent = "";
  computerChoiceEl.textContent = "";
  playerScoreEl.textContent = "Score: 0";
  computerScoreEl.textContent = "Score: 0";
  tiesEl.textContent = "Ties: 0";
  winnerEl.textContent = "";
  resetEl.style.display = "none";
  winners = [];
};

startGame();
