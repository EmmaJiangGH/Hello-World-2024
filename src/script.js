// Pomodoro timer variables
let timer;
let workTime = 6; // Set to 6 seconds for testing
let breakTime = 3; // Set to 3 seconds for testing
let timeLeft = workTime;
let isRunning = false;
let pomodoroLoop = 0; // Count the number of work loops completed
let tasksCompleted = 0;
let timeStudied = 0;

const totalCycles = 4; // Circles to display
const timerDisplay = document.getElementById("timer");
const startButton = document.querySelector("#pomodoro button:nth-of-type(1)");
const pauseButton = document.querySelector("#pomodoro button:nth-of-type(2)");
const resetButton = document.querySelector("#pomodoro button:nth-of-type(3)");
const taskInput = document.getElementById("todo-input");
const tasksList = document.getElementById("tasks");
const cycleDisplay = document.getElementById("cycle-display"); 

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete Completed Tasks";
deleteButton.onclick = deleteCompletedTasks;
document.getElementById("todo-list").appendChild(deleteButton);

const addTaskButton = document.querySelector("#todo-list button");

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateCycleDisplay() {
    cycleDisplay.innerHTML = "";
    const completedWorkCycles = Math.floor(pomodoroLoop / 2); // Only work cycles count

    for (let i = 0; i < totalCycles; i++) {
        const circle = document.createElement("span");
        circle.className = "cycle-indicator";
        if (i < completedWorkCycles) {
            circle.classList.add("completed");
        }
        cycleDisplay.appendChild(circle);
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;

        // Set timeLeft for the first cycle
        timeLeft = workTime; // Reset to work time when starting
        updateTimerDisplay(); // Display initial time

        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                // When timer hits 0, switch between work and break cycles
                pomodoroLoop++;
                updateCycleDisplay(); // Update cycle display on every cycle switch

                if (pomodoroLoop % 2 === 0) { 
                    tasksCompleted++;
                    saveProgress(); // Call the save function here
                }

                if (pomodoroLoop % 2 === 0) { 
                    timeLeft = workTime; // Reset to work time
                } else {
                    timeLeft = breakTime; // Switch to break time
                }

                updateTimerDisplay(); // Show updated time immediately for new cycle
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = workTime;
    updateTimerDisplay();
    isRunning = false;
    pomodoroLoop = 0;
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

// Function to save progress to JSON file
function saveProgress() {
    const data = {
        tasksCompleted,
        workLoops: Math.floor(pomodoroLoop / 2) // Count of completed work loops
    };

    fetch('/save-progress', { // Adjusted endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}



document.getElementById("save-data-button").remove(); // Remove save button as it's no longer needed
addTaskButton.addEventListener("click", addTask);
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

addTaskButton.style.display = "block";
addTaskButton.style.margin = "20px auto 0";

updateTimerDisplay(); 
updateCycleDisplay();
