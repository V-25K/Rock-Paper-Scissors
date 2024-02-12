// Retrieve the score from local storage, or initialize it to a default value if it doesn't exist
const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

/*
Define the possible results of a game: win, loss, or tie
The keys in this object correspond to the keys used in the score object
*/
const result = {
  win: "You WON!",
  loss: "You LOST!",
  tie: "It's a TIE!",
};

let isButtonDisabled = false; // Flag to track if buttons are disabled

updateScore();
gameResult(); // This get the previous scores, result on the page when reloaded
resetScore();

// Function to display the game result
function gameResult() {
  if (score.wins > score.losses) {
    document.querySelector("#js-result").innerHTML = `${result.win}`;
  } else if (score.wins < score.losses) {
    document.querySelector("#js-result").innerHTML = `${result.loss}`;
  } else {
    document.querySelector("#js-result").innerHTML = `${result.tie}`;
  }
}

// Function to update the score display
function updateScore() {
  document.querySelector("#js-scoreW").innerHTML = `${score.wins} `;
  document.querySelector("#js-scoreL").innerHTML = `${score.losses} `;
  document.querySelector("#js-scoreT").innerHTML = `${score.ties} `;
}

// Function to reset the score
function resetScore() {
  if (score.losses === 0 && score.ties === 0 && score.wins === 0) {
    document.querySelector("#js-result").innerHTML = `No games played yet.`;
    return;
  }
  gameResult();

  score.losses = 0;
  score.wins = 0;
  score.ties = 0;
  localStorage.removeItem("score");

  updateScore();
}

// Function to simulate the bot's move
function botMove() {
  const randonNumber = Math.random();
  let botMove = "";

  if (randonNumber < 1 / 3 && randonNumber >= 0) {
    botMove = "rock";
  } else if (randonNumber < 2 / 3 && randonNumber >= 1 / 3) {
    botMove = "paper";
  } else if (randonNumber < 1 && randonNumber >= 2 / 3) {
    botMove = "scissor";
  }
  return botMove;
}

// Function to handle a player's move
function play(playerMove) {
  if (isButtonDisabled) {
    return;
  }
  disableButtons();
  document.querySelector("#js-result").innerHTML = "";
  Move = botMove();

  if (Move === playerMove) {
    document.getElementById(`${playerMove}Btn`).classList.add("commonActive");
    setTimeout(function () {
      document
        .getElementById(`${playerMove}Btn`)
        .classList.remove("commonActive");
    }, 500);
  } else {
    //setting the bg-color of the button the player choose
    document.getElementById(`${playerMove}Btn`).classList.add("playerActive");
    setTimeout(function () {
      document
        .getElementById(`${playerMove}Btn`)
        .classList.remove("playerActive");
    }, 500);

    //setting the bg-color of the button the bot choose
    document.getElementById(`${Move}Btn`).classList.add("botActive");
    setTimeout(function () {
      document.getElementById(`${Move}Btn`).classList.remove("botActive");
    }, 500);
  }

  // Determine the result of the game based on the player's and bot's moves
  if (playerMove === "rock") {
    if (Move === "rock") {
      result.tie;
      score.ties++;
    } else if (Move === "scissor") {
      result.win;
      score.wins++;
    } else if (Move === "paper") {
      result.loss;
      score.losses++;
    }
  } else if (playerMove === "scissor") {
    if (Move === "rock") {
      result.loss;
      score.losses++;
    } else if (Move === "scissor") {
      result.tie;
      score.ties++;
    } else if (Move === "paper") {
      result.win;
      score.wins++;
    }
  } else if (playerMove === "paper") {
    if (Move === "rock") {
      result.win;
      score.wins++;
    } else if (Move === "scissor") {
      result.loss;
      score.losses++;
    } else if (Move === "paper") {
      result.tie;
      score.ties++;
    }
  }

  // Update the score in local storage and display it
  localStorage.setItem("score", JSON.stringify(score));
  updateScore();

  // Re-enable the buttons after a short delay
  setTimeout(enableButtons, 700);
}

// Function to disable the buttons
function disableButtons() {
  isButtonDisabled = true;
  // Disable your buttons here
  document.getElementById("rockBtn").disabled = true;
  document.getElementById("scissorBtn").disabled = true;
  document.getElementById("paperBtn").disabled = true;
}

// Function to enable the buttons
function enableButtons() {
  isButtonDisabled = false;
  // Enable your buttons here
  document.getElementById("rockBtn").disabled = false;
  document.getElementById("scissorBtn").disabled = false;
  document.getElementById("paperBtn").disabled = false;
}
