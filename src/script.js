// Pomodoro timer variables
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
const timerDisplay = document.getElementById("timer");
const startButton = document.querySelector("#pomodoro button:nth-of-type(1)");
const pauseButton = document.querySelector("#pomodoro button:nth-of-type(2)");
const resetButton = document.querySelector("#pomodoro button:nth-of-type(3)");
const taskInput = document.getElementById("todo-input");
const tasksList = document.getElementById("tasks");

// Create and append the delete button
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete Completed Tasks";
deleteButton.onclick = deleteCompletedTasks;
document.getElementById("todo-list").appendChild(deleteButton);

// Add Task button reference
const addTaskButton = document.querySelector("#todo-list button");

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert("Time's up!");
            }
        }, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateTimerDisplay();
    isRunning = false;
}

function deleteCompletedTasks() {
    const tasks = tasksList.getElementsByTagName("li");
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].querySelector("input[type='checkbox']").checked) {
            tasksList.removeChild(tasks[i]);
        }
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    const listItems = tasksList.getElementsByTagName("li").length; // Count existing tasks

    if (taskText !== "" && listItems < 5) { // Check if less than 5 tasks
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            listItem.style.textDecoration = checkbox.checked ? "line-through" : "none";
        });

        listItem.prepend(checkbox);
        tasksList.appendChild(listItem);
        taskInput.value = ""; // Clear input field after adding
    } else if (listItems >= 5) {
        alert("You can only add up to 5 tasks.");
    }
}

// Event listeners for buttons
addTaskButton.addEventListener("click", addTask); // Ensure the addTask function is called
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Centering the Add Task button
addTaskButton.style.display = "block"; // Make it a block element
addTaskButton.style.margin = "20px auto 0"; // Center it

updateTimerDisplay(); // Initial timer display update
