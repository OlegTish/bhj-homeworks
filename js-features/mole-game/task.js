let deadCount = document.getElementById("dead");
let lostCount = document.getElementById("lost");

const maxWins = 10;
const maxLosses = 5;

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

function randomizeMole() {
  const index = Math.floor(Math.random() * 9) + 1;
  for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    if (i === index) {
      hole.classList.add("hole_has-mole");
    } else {
      hole.classList.remove("hole_has-mole");
    }
  }
}

function checkGameState() {
  if (parseInt(deadCount.textContent) >= maxWins) {
    alert("Вы победили!");
    resetGame();
  }
  if (parseInt(lostCount.textContent) >= maxLosses) {
    alert("Вы проиграли!");
    resetGame();
  }
}

function resetGame() {
  deadCount.textContent = 0;
  lostCount.textContent = 0;
}

for (let i = 1; i <= 9; i++) {
  const hole = getHole(i);

  hole.onclick = function () {
    if (hole.classList.contains("hole_has-mole")) {
      deadCount.textContent = parseInt(deadCount.textContent) + 1;
    } else {
      lostCount.textContent = parseInt(lostCount.textContent) + 1;
    }

    checkGameState();

    randomizeMole();
  };
}

randomizeMole();
