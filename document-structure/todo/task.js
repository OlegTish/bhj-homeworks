document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".tasks__form");
  const input = document.querySelector(".tasks__input");
  const tasksList = document.querySelector(".tasks__list");

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTaskToDOM(task);
    });
  };

  const saveTasks = () => {
    const tasks = Array.from(document.querySelectorAll(".task__title")).map(
      (task) => task.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTaskToDOM = (taskText) => {
    const taskHTML = `
      <div class="task">
        <div class="task__title">${taskText}</div>
        <a href="#" class="task__remove">&times;</a>
      </div>
    `;
    tasksList.insertAdjacentHTML("afterbegin", taskHTML);

    // Добавляем обработчик для удаления задачи
    const taskRemove = tasksList.querySelector(".task__remove");
    taskRemove.addEventListener("click", (event) => {
      event.preventDefault();
      taskRemove.parentElement.remove();
      saveTasks();
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() !== "") {
      const taskText = input.value.trim();
      addTaskToDOM(taskText);
      input.value = "";
      saveTasks();
    }
  });

  loadTasks();
});