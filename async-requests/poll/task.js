document.addEventListener("DOMContentLoaded", () => {
    const pollTitle = document.getElementById("poll__title");
    const pollAnswers = document.getElementById("poll__answers");
  
    const pollUrl = "https://students.netoservices.ru/nestjs-backend/poll";
  
    function loadPoll() {
      fetch(pollUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          pollTitle.textContent = data.data.title;
  
          const answers = data.data.answers;
          pollAnswers.innerHTML = "";
          answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.classList.add("poll__answer");
            button.textContent = answer;
            button.addEventListener("click", () => vote(data.id, index));
            pollAnswers.appendChild(button);
          });
        })
        .catch((error) => {
          console.error("Ошибка при загрузке опроса:", error);
          alert("Не удалось загрузить опрос. Попробуйте позже.");
        });
    }
  
    function vote(pollId, answerIndex) {
      alert("Спасибо, ваш голос засчитан!");
  
      fetch(pollUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        body: `vote=${pollId}&answer=${answerIndex}`
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          showResults(data.stat);
        })
        .catch((error) => {
          console.error("Ошибка при отправке голоса:", error);
          alert("Не удалось отправить голос. Попробуйте позже.");
        });
    }
  
    function showResults(stat) {
      pollAnswers.innerHTML = "";
      stat.forEach((result) => {
        const resultDiv = document.createElement("div");
        const percentage = (
          (result.votes / stat.reduce((acc, curr) => acc + curr.votes, 0)) *
          100
        ).toFixed(2);
        resultDiv.textContent = `${result.answer}: ${result.votes} голосов (${percentage}%)`;
        pollAnswers.appendChild(resultDiv);
      });
    }
  
    loadPoll();
  });
  