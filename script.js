document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".add-task");
  const taskInput = document.querySelector(".task-input");
  const taskSection = document.querySelector(".task-section");
  const clearButton = document.querySelector(".clear-all");

  // Add on click event to the add button
  addButton.addEventListener("click", addTask);

  // Clear on click event for the clear button
  clearButton.addEventListener("click", () => {
    console.log("Clear all tasks");
    clearAllTasks();
  });

  // Add on Enter key event
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const text = taskInput.value.trim();
    // Check if the input is not empty
    if (!text) {
      return;
    }

    const task = document.createElement("div");
    task.classList.add("task-item");
    task.textContent = text;
    taskSection.appendChild(task);

    taskInput.value = "";
  }

  function clearAllTasks() {
    taskSection.innerHTML = "";
  }
});
