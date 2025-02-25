const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// GitHub RAW URL of tasks.json (replace with your URL)
const GITHUB_JSON_URL = "https://raw.githubusercontent.com/Mosha-izhevsk/2Dolist/main/tasks.json"

// Function to fetch tasks from GitHub
async function loadTasks() {
    try {
        const response = await fetch(GITHUB_JSON_URL);
        const tasks = await response.json();
        taskList.innerHTML = ""; // Clear old tasks

        tasks.forEach((task) => addTask(task.text, task.completed));
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

// Function to add a task (same as before)
function addTask(text = null, completed = false) {
    const taskText = text || taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">X</button>
    `;

    const taskSpan = taskItem.querySelector(".task-text");
    if (completed) {
        taskSpan.classList.add("completed");
    }
    taskSpan.addEventListener("click", function () {
        this.classList.toggle("completed");
    });

    taskItem.querySelector(".delete-btn").addEventListener("click", function () {
        taskItem.remove();
        alert("Task removed!");
    });

    taskList.appendChild(taskItem);
    taskInput.value = "";
}

// Load tasks from GitHub when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Event Listeners
addTaskBtn.addEventListener("click", () => addTask());
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
});
