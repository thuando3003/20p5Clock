let breakMin = 5;
let sessionMin = 25;
let timer;
let isSession = true;
let isRunning = false;
let secLeft = sessionMin * 60;

const breakDecBtn = document.getElementById("break-decrement");
const breakIncBtn = document.getElementById("break-increment");
const sessionDecBtn = document.getElementById("session-decrement");
const sessionIncBtn = document.getElementById("session-increment");
const breakMinDisplay = document.getElementById("break-length");
const sessionMinDisplay = document.getElementById("session-length");
const timerLabel = document.getElementById("timer-label");
const timeLeftDisplay = document.getElementById("time-left");
const startStop = document.getElementById("start-stop");
const reset = document.getElementById("reset");

function updateDisplay() {
    const min = Math.floor(secLeft / 60);
    const sec = secLeft % 60;
    timeLeftDisplay.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startStop.textContent = 'Stop';
        timer = setInterval(() => {
            if (secLeft > 0) {
                secLeft--;
                updateDisplay();
            } else {
                isSession = !isSession;
                secLeft = (isSession ? sessionMin : breakMin) * 60;
                timerLabel.textContent = isSession ? "Session" : "Break";
                updateDisplay();
            }
        }, 1000);
    } else {
        isRunning = false;
        startStop.textContent = 'Start';
        clearInterval(timer);
    }
}



function breakPlusMinus(amount) {
    if ((breakMin + amount) > 0) {
        breakMin += amount;
        breakMinDisplay.textContent = breakMin;
        if (!isRunning && !isSession) {
            secLeft = breakMin * 60;
            updateDisplay();
        }
    }
}

function sessionPlusMinus(amount) {
    if ((sessionMin + amount) > 0) {
        sessionMin += amount;
        sessionMinDisplay.textContent = sessionMin;
        if (!isRunning && isSession) {
            secLeft = sessionMin * 60;
            updateDisplay();
        }
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isSession = true;
    breakMin = 5;
    sessionMin = 25;
    secLeft = sessionMin * 60;
    startStop.textContent = 'Start';
    breakMinDisplay.textContent = breakMin;
    sessionMinDisplay.textContent = sessionMin;
    timerLabel.textContent = "Session";
    updateDisplay();
}

breakDecBtn.addEventListener('click', () => breakPlusMinus(-1));
breakIncBtn.addEventListener('click', () => breakPlusMinus(1));
sessionDecBtn.addEventListener('click', () => sessionPlusMinus(-1));
sessionIncBtn.addEventListener('click', () => sessionPlusMinus(1));
startStop.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);

updateDisplay();
