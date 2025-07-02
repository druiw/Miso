document.addEventListener("DOMContentLoaded", () => {
  const KEY = "tasks";
  let tasks = loadTasks(); // pulls from localStorage or []

  const addButton = document.querySelector(".add-task");
  const taskInput = document.querySelector(".task-input");
  const taskSection = document.querySelector(".task-section");
  const clearButton = document.querySelector(".clear-all");
  const filterButtons = document.querySelectorAll(".filter");

  // INITIAL RENDER of saved tasks
  tasks.forEach(({ id, text, completed }) =>
    createTaskElement(id, text, completed)
  );

  // ADD TASK
  addButton.addEventListener("click", handleAdd);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd();
  });

  // CLEAR ALL
  clearButton.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    taskSection.innerHTML = "";
  });

  // FILTER TABS
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.forTab));
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove from all
      filterButtons.forEach((b) => b.classList.remove("active"));
      // add to the clicked one
      btn.classList.add("active");
      applyFilter(btn.dataset.forTab);
    });
  });

  // ─── FUNCTIONS ─────────────────────────────────────────

  function handleAdd() {
    const text = taskInput.value.trim();
    if (!text) return;

    const id = Date.now().toString();
    tasks.push({ id, text, completed: false });
    saveTasks();

    createTaskElement(id, text, false);
    taskInput.value = "";
    taskInput.focus();
  }

  function createTaskElement(id, text, completed) {
    const task = document.createElement("div");
    task.classList.add("task-item");
    task.dataset.id = id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
      toggleCompleted(id, checkbox.checked);
      task.classList.toggle("completed", checkbox.checked);
    });

    const span = document.createElement("span");
    span.textContent = text;

    if (completed) task.classList.add("completed");

    task.append(checkbox, span);
    taskSection.appendChild(task);
  }

  function toggleCompleted(id, isDone) {
    const t = tasks.find((t) => t.id === id);
    if (t) {
      t.completed = isDone;
      saveTasks();
    }
  }

  function applyFilter(tab) {
    document.querySelectorAll(".task-item").forEach((task) => {
      const done = task.classList.contains("completed");
      const show = tab === "1" ? true : tab === "2" ? !done : done;
      task.style.display = show ? "flex" : "none";
    });
  }

  function loadTasks() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }
});
