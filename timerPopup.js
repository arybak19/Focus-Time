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

function updateDisplay() {
    chrome.runtime.sendMessage({action: 'getTimerStatus'}, (response) => {
        if (response.isTimerRunning) {
            let minutes = Math.floor(response.timeLeft / 60);
            let seconds = response.timeLeft % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            document.querySelector('#time').textContent = minutes + ":" + seconds;
            }
        });
    }
    
    window.onload = function() {
        updateDisplay();
        setInterval(updateDisplay, 1000);
    };