document.addEventListener("DOMContentLoaded", () => {
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
      const task = document.createElement("div");
      task.className = "task";
  
      const taskTitle = document.createElement("div");
      taskTitle.className = "task__title";
      taskTitle.textContent = taskText;
  
      const taskRemove = document.createElement("a");
      taskRemove.className = "task__remove";
      taskRemove.href = "#";
      taskRemove.innerHTML = "&times;";
      taskRemove.addEventListener("click", (event) => {
        event.preventDefault();
        task.remove();
        saveTasks();
      });
  
      task.appendChild(taskTitle);
      task.appendChild(taskRemove);
      tasksList.appendChild(task);
    };
  
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && input.value.trim() !== "") {
        const taskText = input.value.trim();
        addTaskToDOM(taskText);
        input.value = "";
        saveTasks();
      }
    });
  
    loadTasks();
  });
  