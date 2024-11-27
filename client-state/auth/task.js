document.addEventListener("DOMContentLoaded", () => {
    const signinForm = document.getElementById("signin__form");
    const signinBlock = document.getElementById("signin");
    const welcomeBlock = document.getElementById("welcome");
    const userIdSpan = document.getElementById("user_id");
  
    const savedUserId = localStorage.getItem("user_id");
    if (savedUserId) {
      showWelcome(savedUserId);
    }
  
    signinForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const formData = new FormData(signinForm);
      const url = signinForm.action;
  
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("user_id", data.user_id);
  
            showWelcome(data.user_id);
          } else {
            alert("Неверный логин/пароль");
          }
        })
        .catch((error) => {
          console.error("Ошибка:", error);
          alert("Произошла ошибка при отправке запроса.");
        });
    });
  
    function showWelcome(userId) {
      signinBlock.classList.remove("signin_active");
      welcomeBlock.classList.add("welcome_active");
      userIdSpan.textContent = userId;
    }
  });
  