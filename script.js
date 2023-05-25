// Query DOM elements
const taskForm = document.querySelector("#task-form");
const submitBtn = document.querySelector("#submit-btn");
const taskList = document.querySelector("#task-list");
const taskInput = document.querySelector("#task-input");

let tasks = [],
  taskInputData;

// Retrieve tasks from local storage
const getData = () => {
  const gotData = localStorage.getItem("tasks");
  if (gotData) {
    tasks = JSON.parse(gotData); // Parse and load the data into the tasks array
  }
};

// Load tasks from local storage on DOM load
document.addEventListener("DOMContentLoaded", () => {
  getData();
  displayTasks();
});

// Render tasks in the DOM
const displayTasks = () => {
  taskList.innerHTML = ""; // Clear existing list

  tasks.forEach(function (todo, index) {
    // Create list item for each task
    const li = document.createElement("li");
    li.classList.add("todo");

    // Create and append a checkbox for each task
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);

    // Create and append a span for each task's text
    const span = document.createElement("span");
    span.textContent = todo.text;
    li.appendChild(span);

    // Create and append a delete button for each task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    // Event Listener for Delete Button - deletes task on click
    deleteBtn.addEventListener("click", () => {
      deleteTasks(index);
    });

    // Event Listener for checkbox - updates task's completed status and style on change
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      span.style.textDecoration = todo.completed ? "line-through" : "none";
    });

    // Append each task to the list
    taskList.appendChild(li);
  });
};

// Delete task and update local storage
const deleteTasks = (index) => {
  tasks.splice(index, 1); // Remove task from array
  displayTasks(); // Re-render tasks
  saveData(); // Update local storage
};

// Event listener for Submit Button - adds new tasks
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskInputData = taskInput.value.trim();
  tasks.push({ text: taskInputData, completed: false }); // Push new task to tasks array
  if (taskInputData !== "") {
    displayTasks(); // Re-render tasks
    saveData(); // Update local storage
    taskInput.value = ""; // Clear input field
  }
});

// Save tasks to local storage
const saveData = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
