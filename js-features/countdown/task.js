const timerElement = document.getElementById("timer");

let timeLeft = parseInt(timerElement.textContent, 10);

const countdown = setInterval(() => {
  timeLeft--;

  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    alert("Вы победили в конкурсе!");
  }
}, 1000);
