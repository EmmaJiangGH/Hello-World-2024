// Pomodoro timer variables
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
const timerDisplay = document.getElementById("timer");
const startButton = document.querySelector("#pomodoro button:nth-of-type(1)");
const pauseButton = document.querySelector("#pomodoro button:nth-of-type(2)");
const resetButton = document.querySelector("#pomodoro button:nth-of-type(3)");
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
                alert("idk yet");
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
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = taskText;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                listItem.style.textDecoration = "line-through";
            } else {
                listItem.style.textDecoration = "none";
            }
        });
        listItem.prepend(checkbox);
        tasksList.appendChild(listItem);
        taskInput.value = "";
    }
}
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
updateTimerDisplay();
let spritePosition = 0;

