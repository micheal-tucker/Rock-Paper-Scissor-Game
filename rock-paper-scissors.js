let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
  console.log("No score found in localStorage, using default score.");
  score = { wins: 0, losses: 0, ties: 0 };
} else {
  console.log("Score retrieved from localStorage:", score);
}
updateScoreElement(); // Initialize UI with the score

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose.";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  }
  // Paper
  else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You lose.";
    }
  }
  // Rock
  else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
    } else if (computerMove === "Scissors") {
      result = "You win.";
    }
  }

  // update score
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  // storing the score
  localStorage.setItem("score", JSON.stringify(score)); // Store score properly
  console.log("Updated score saved to localStorage:", score); // Check if it's saved

  updateScoreElement();

  // result paragraph
  document.querySelector(".js-result").innerHTML = result;

  // move paragraph
  document.querySelector(".js-move").innerHTML = `You
        <img src="assets/${playerMove}-emoji.png" alt="" class="move-icon">

        <img src="assets/${computerMove}-emoji.png" alt="" class="move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let ComputerMove = "";

function pickComputerMove() {
  const randomNumber = Math.random();

  // Computer code.

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  console.log(computerMove);
}

// function resetScore() {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "Do you really want to reset the score?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, reset it!",
//     cancelButtonText: "No, keep it",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Only reset if the user clicks "Yes"
//       score.wins = 0;
//       score.losses = 0;
//       score.ties = 0;
//       localStorage.setItem("score", JSON.stringify(score));

//       updateScoreElement();

//       Swal.fire("Reset!", "Your score has been reset.", "success");
//     } else {
//       // If the user clicks "No, keep it", just exit without resetting
//       console.log("Score reset cancelled");
//     }
//   });
// }

async function resetScore() {
  try {
    console.log("resetScore function triggered");

    let storedScore = JSON.parse(localStorage.getItem("score"));
    console.log("Score retrieved before reset:", storedScore);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to reset the score?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
      cancelButtonText: "No, keep it",
    });

    console.log("SweetAlert result:", result);

    if (result.isConfirmed) {
      console.log("User confirmed score reset.");

      // Reset the existing score object instead of redeclaring it
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;

      // Update localStorage
      localStorage.setItem("score", JSON.stringify(score));
      console.log("Score successfully reset in localStorage:", score);

      // Update the score again
      updateScoreElement();

      // Show success message
      await Swal.fire("Reset!", "Your score has been reset.", "success");
    } else {
      console.log("Score reset cancelled.");

      // Restore the score from localStorage (if it exists)
      if (storedScore) {
        score = storedScore;
        console.log("Restored score after cancel:", score);
      } else {
        console.log("No previous score found, keeping current values.");
      }

      // Update the code to show the correct score
      updateScoreElement();
    }
  } catch (error) {
    console.error("Error in resetting score:", error);
  }
}

// Function to update the score element
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Load score from localStorage when the page loads (Only declared here!)
score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScoreElement();

// Function to pick computer's move (example)
function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return "Rock";
  } else if (randomNumber < 2 / 3) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  Swal.fire({
    title: "Welcome to Rock-Paper-Scissors!",
    text: "Are you ready to play? Choose Rock, Paper, or Scissors!",
    icon: "info",
    confirmButtonText: "Let's Go!",
    confirmButtonColor: "#3085d6",
    allowOutsideClick: false,
  });
});
