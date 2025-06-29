document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".add-task");
  const taskInput = document.querySelector(".task-input");
  const taskSection = document.querySelector(".task-section");
  const clearButton = document.querySelector(".clear-all");
  const filters = document.querySelector(".filter");
  const completedFilter = filters[2];

  // Add on click event to the add button
  addButton.addEventListener("click", addTask);

  // Add on Enter key event
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  // Clear on click event for the clear button
  clearButton.addEventListener("click", () => {
    console.log("Clear all tasks");
    clearAllTasks();
  });

  completedFilter.addEventListener("click", showCompletedTasks);

  function addTask() {
    const text = taskInput.value.trim();
    // Check if the input is not empty
    if (!text) {
      return;
    }

    const task = document.createElement("div");
    task.classList.add("task-item");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    checkbox.addEventListener("change", () =>
      task.classList.toggle("completed", checkbox.checked)
    );

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = text;

    task.append(checkbox, span);
    taskSection.appendChild(task);

    taskInput.value = "";
    taskInput.focus();
  }

  function clearAllTasks() {
    taskSection.innerHTML = "";
  }
});
