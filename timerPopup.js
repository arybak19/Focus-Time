function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function ()       { 
minutes = parseInt(timer / 60, 10);
seconds = parseInt(timer % 60, 10);

minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;

display.textContent = minutes + ":" + seconds;

if(--timer < 0 ) {
    timer = duration;
   }
    }, 1000);    
}

// timerPopup.js

document.addEventListener('DOMContentLoaded', function() {
    function updateTimerDisplay() {
        chrome.runtime.sendMessage({action: 'getTimerStatus'}, (response) => {
            const timeDisplay = document.querySelector('#time');
            if (timeDisplay) {
                if (response && response.isTimerRunning) {
                    let minutes = Math.floor(response.timeLeft / 60);
                    let seconds = response.timeLeft % 60;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
                    timeDisplay.textContent = `${minutes}:${seconds}`;
                } else {
                    timeDisplay.textContent = 'No active timer';
                }
            } else {
                console.error('Timer display element not found');
            }
        });
    }

    // Update the display immediately and then every second
    updateTimerDisplay();
    const timerInterval = setInterval(updateTimerDisplay, 1000);

    // Add stop button functionality
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