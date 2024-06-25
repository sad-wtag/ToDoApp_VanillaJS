const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("btn-add");
const unoderedList = document.getElementById("tasks");

let tasks = [];
let currentTaskId = null;

const addTaskHandler = () => {
    const taskTitle = taskInput.value.trim();
    if (taskTitle) {
        createTask(taskTitle + " ");
    } else {
        alert("Please provide valid Task.");
    }
};

const createTask = (taskTitle) => {
    const task = {
        id: new Date().getTime(),
        title: taskTitle
    };
    tasks.unshift(task);
    renderTasks();

    taskInput.value = "";
};

const deleteHandler = (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    if (currentTaskId === taskId) {
        currentTaskId = null;
    }
    renderTasks();
};

const editHandler = (taskId, currentTitleElement, editButton) => {
    if (currentTaskId !== null && currentTaskId !== taskId) {
        cancelEdit();
    }

    currentTaskId = taskId;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const currentTask = tasks[taskIndex];
    const newId = new Date().getTime();
    console.log(taskId);
    editButton.style.display = "none";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentTask.title.trim();
    inputField.classList.add("edit-input");

    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.addEventListener("click", () => {
        updateTask(inputField.value.trim()+" ", taskIndex, newId, editButton);
    });

    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.addEventListener("click", () => {
        cancelEdit();
    });

    currentTitleElement.textContent = "";
    currentTitleElement.appendChild(inputField);
    currentTitleElement.appendChild(updateButton);
    currentTitleElement.appendChild(cancelButton);
};

const updateTask = (newTitle, taskIndex,newId, editButton) => {
    if (newTitle) {
        tasks[taskIndex].title = newTitle;
        tasks[taskIndex].id = newId;
        console.log(tasks[taskIndex].id);
        currentTaskId = null;
        renderTasks();
    } else {
        alert("Please provide valid Task.");
    }
    editButton.style.display = "block";
};

const cancelEdit = () => {
    currentTaskId = null;
    renderTasks();
};

const renderTasks = () => {
    unoderedList.innerHTML = '';

    tasks.forEach((task) => {
        const tasksList = document.createElement("li");
        const titleElement = document.createElement("span");
        titleElement.textContent = task.title;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => deleteHandler(task.id));

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => editHandler(task.id, titleElement, editButton));

        tasksList.appendChild(titleElement);
        tasksList.appendChild(editButton);
        tasksList.appendChild(deleteButton);
        unoderedList.appendChild(tasksList);
    });
};

addButton.addEventListener("click", addTaskHandler);