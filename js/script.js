import { $taskInput, $addButton, $taskList } from "./elements.js";
import {
  showToastMessage,
  sanitizeInput,
  createElement,
  formatDate,
} from "./utilities.js";

let tasks = [];

const addButtonHandler = () => {
  const taskTitle = sanitizeInput($taskInput.value);
  if (taskTitle) {
    createTask(taskTitle);
    showToastMessage("Task added successfully!");
    $addButton.disabled = true;
  } else showToastMessage("Please provide a valid title!");
};

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
};

const editHandler = (task) => {
  cancelEdit();
  task.editMode = true;
  renderTasks();
};

const updateHandler = (taskObj, newTitle) => {
  if (newTitle.trim().length > 0) {
    task.title = newTitle.trim();
  }
  cancelEdit();
  renderTasks();
};

const doneHandler = (taskId) => {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.done = !task.done;
    renderTasks();
  }
};

const createTask = (taskTitle) => {
  const task = {
    id: new Date().getTime(),
    title: taskTitle,
    createdAt: formatDate(new Date()),
    deleteButton: createElement("Delete", "button", () => deleteTask(task.id)),
    editMode: false,
  };
  tasks.unshift(task);
  renderTasks();
  $taskInput.value = "";
};

const renderTasks = () => {
  $taskList.innerHTML = "";
  tasks.forEach((task) => {
    const $tasksList = document.createElement("li");
    const $titleElement = document.createElement("span");
    $titleElement.textContent = task.title;
    if (task.done) {
      $titleElement.style.textDecoration = "line-through";
    }

    if (task.editMode) {
      const $inputField = document.createElement("input");
      $inputField.type = "text";
      $inputField.value = task.title;

      const $updateButton = createElement("Update", "button", () =>
        updateHandler(task, $inputField.value)
      );
      const $cancelButton = createElement("Cancel", "button", cancelEdit);

      $inputField.addEventListener("input", () => {
        handleInputChange($inputField, $updateButton, task);
      });

      $tasksList.append($inputField, $updateButton, $cancelButton);
    } else {
      const $deleteButton = createButton("Delete", () =>
        deleteHandler(task.id)
      );
      const $editButton = createButton("Edit", () => editHandler(task));

      $tasksList.append($titleElement, $deleteButton);
      if (!task.done) {
        $tasksList.append($editButton, $doneButton);
      }
    }

    $taskList.appendChild($tasksList);
  });
};

const cancelEdit = () => {
  tasks.forEach((task) => (task.editMode = false));
  renderTasks();
};

$taskInput.addEventListener("input", () => {
  if ($taskInput.value.trim()) {
    $addButton.disabled = false;
  } else {
    $addButton.disabled = true;
  }
});

$addButton.addEventListener("click", addButtonHandler);
