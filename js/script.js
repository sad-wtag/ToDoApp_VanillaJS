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

const createTask = (taskTitle) => {
  const task = {
    id: new Date().getTime(),
    title: taskTitle,
    createdAt: formatDate(new Date()),
  };
  tasks.unshift(task);
  renderTasks();

  $taskInput.value = "";
};

const renderTasks = () => {
  $taskList.innerHTML = "";

  tasks.forEach((task) => {
    const texts = [task.title, " Created at: " + task.createdAt];
    const $tasksList = createElement(texts, "li");
    $taskList.appendChild($tasksList);
  });
};

$taskInput.addEventListener("input", () => {
  if ($taskInput.value.trim()) {
    $addButton.disabled = false;
  } else {
    $addButton.disabled = true;
  }
});

$addButton.addEventListener("click", addButtonHandler);
