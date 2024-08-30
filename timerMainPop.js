// timerMainPop.js

function updateTimerDisplay() {
    chrome.runtime.sendMessage({action: 'getTimerStatus'}, (response) => {
        const output = document.getElementById('value-output');
        if (response.isTimerRunning) {
            let minutes = Math.floor(response.timeLeft / 60);
            let seconds = response.timeLeft % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            output.textContent = `${minutes}:${seconds}`;
        } else {
            output.textContent = 'No active timer';
        }
    });
}

window.onload = function() {
    updateTimerDisplay();
    // Update the display every second
    setInterval(updateTimerDisplay, 1000);

    // Add a stop button functionality
    const stopButton = document.getElementById('stop-button');
    if (stopButton) {
        stopButton.addEventListener('click', function() {
            chrome.runtime.sendMessage({action: 'stopTimer'});
            updateTimerDisplay(); // Immediately update the display
        });
    }
};