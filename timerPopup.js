// timerPopup.js


// Start the timer and create the display for popup
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval); // Stop the timer
        }
    }, 1000);
}

// Get the value of the time from localStorage
window.onload = function() {
    var value = localStorage.getItem('myValue');
    let output = parseInt(value, 10);
    var userInput = 60 * output, // the user's inputted time
        display = document.querySelector('#time');
    startTimer(userInput, display);
};
