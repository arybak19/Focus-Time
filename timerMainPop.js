// timerMainPop.js

document.addEventListener('DOMContentLoaded', function() {
    function updateTimerDisplay() {
        chrome.runtime.sendMessage({action: 'getTimerStatus'}, (response) => {
            const output = document.getElementById('value-output');
            if (output) {
                if (response && response.isTimerRunning) {
                    let minutes = Math.floor(response.timeLeft / 60);
                    let seconds = response.timeLeft % 60;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
                    output.textContent = `${minutes}:${seconds}`;
                } else {
                    output.textContent = 'No active timer';
                }
            } else {
                console.error('Timer output element not found');
            }
        });
    }

    // Update the display immediately and then every second
    updateTimerDisplay();
    const timerInterval = setInterval(updateTimerDisplay, 1000);

    // Add a stop button functionality
    const stopButton = document.getElementById('stop-button');
    if (stopButton) {
        stopButton.addEventListener('click', function() {
            chrome.runtime.sendMessage({action: 'stopTimer'}, () => {
                updateTimerDisplay(); // Immediately update the display
            });
        });
    } else {
        console.error('Stop button not found');
    }

    // Cleanup interval when the popup is closed
    window.addEventListener('unload', () => {
        clearInterval(timerInterval);
    });
});