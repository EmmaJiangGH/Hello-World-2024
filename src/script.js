// Pomodoro timer variables
let timer;
let workTime = 6; // Set to 6 seconds for testing
let breakTime = 3; // Set to 3 seconds for testing
let timeLeft = workTime;
let isRunning = false;
let pomodoroLoop = 0;
let workCyclesCompleted = 0; // Track only work cycles
let tasksCompleted = 0;
const totalCycles = 4; // Circles to display

const timerDisplay = document.getElementById("timer");
const startButton = document.querySelector("#pomodoro button:nth-of-type(1)");
const pauseButton = document.querySelector("#pomodoro button:nth-of-type(2)");
const resetButton = document.querySelector("#pomodoro button:nth-of-type(3)");
const taskInput = document.getElementById("todo-input");
const tasksList = document.getElementById("tasks");
const cycleDisplay = document.getElementById("cycle-display");
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete Completed Tasks";
deleteButton.onclick = deleteCompletedTasks;
document.getElementById("todo-list").appendChild(deleteButton);

const addTaskButton = document.querySelector("#todo-list button");

function loadProgress() {
    fetch('http://localhost:3000/load-progress')
        .then(response => response.json())
        .then(data => {
            tasksCompleted = data.tasksCompleted || 0; // Load tasks completed
            workCyclesCompleted = data.workCycles || 0; // Load work cycles
            updateCycleDisplay(); // Update the display based on loaded data
        })
        .catch(error => console.error('Error loading progress:', error));
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateCycleDisplay() {
    cycleDisplay.innerHTML = "";
    for (let i = 0; i < totalCycles; i++) {
        const circle = document.createElement("span");
        circle.className = "cycle-indicator";
        if (i < workCyclesCompleted % totalCycles) {
            circle.classList.add("completed");
        }
        cycleDisplay.appendChild(circle);
    }
}

function startPomodoro() {
    if (!isRunning) {
        isRunning = true;
        timeLeft = workTime;  // Ensure starting with work time
        timer = setInterval(runPomodoro, 1000);  // Start the timer interval
    }
}

function runPomodoro() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
    } else {
        if (pomodoroLoop % 2 === 0) { // Only track work cycles
            workCyclesCompleted++;
            updateCycleDisplay();
            saveProgress(); // Automatically save after each work cycle
        }
        pomodoroLoop++; // Increment the total loop

        // Reset time for the next cycle
        timeLeft = (pomodoroLoop % 2 === 0) ? workTime : breakTime;
        updateTimerDisplay();
    }
}

function pausePomodoro() {
    clearInterval(timer);
    isRunning = false;
}

function resetPomodoro() {
    clearInterval(timer);
    timeLeft = workTime;
    isRunning = false;
    pomodoroLoop = 0;
    workCyclesCompleted = 0;
    updateTimerDisplay();
    updateCycleDisplay();
}

function deleteCompletedTasks() {
    const tasks = tasksList.getElementsByTagName("li");
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].querySelector("input[type='checkbox']").checked) {
            tasksList.removeChild(tasks[i]);
            tasksCompleted++;
        }
    }
    saveProgress(); // Update progress after deleting tasks
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
            saveProgress();
        });

        listItem.prepend(checkbox);
        tasksList.appendChild(listItem);
        taskInput.value = ""; 
    } else if (listItems >= 5) {
        alert("You can only add up to 5 tasks."); // Alert if limit is reached
    }
}

function saveProgress() {
    const progressData = {
        tasksCompleted,
        workCycles: workCyclesCompleted // Ensure you're tracking work cycles
    };

    fetch('http://localhost:3000/save-progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(progressData)
    })
    fetch('https://localhost:3000/api')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error saving progress:', error));
}



// Initial setup
loadProgress();
document.getElementById("save-data-button").remove(); // Remove save button as it's no longer needed
addTaskButton.addEventListener("click", addTask);
startButton.addEventListener("click", startPomodoro); // Updated to use startPomodoro
pauseButton.addEventListener("click", pausePomodoro); // Updated to use pausePomodoro
resetButton.addEventListener("click", resetPomodoro); // Updated to use resetPomodoro

updateTimerDisplay();
updateCycleDisplay();
