// index.js

document.addEventListener('DOMContentLoaded', function() {
    function submitValue() {
        const input = document.getElementById('value-input');
        if (input) {
            const value = input.value;
            if (value && !isNaN(value) && parseInt(value) > 0) {
                chrome.runtime.sendMessage({action: 'startTimer', duration: parseInt(value)}, () => {
                    // Optionally navigate to timer view or close popup
                    // window.location.href = 'timer.html'; // Uncomment if you want to navigate to a timer page
                    // window.close(); // Uncomment if you want to close the popup
                });
            } else {
                alert('Please enter a valid positive number.');
            }
        } else {
            console.error('Input element not found');
        }
    }

    const startButton = document.getElementById("start");
    if (startButton) {
        startButton.addEventListener("click", submitValue);
    } else {
        console.error('Start button not found');
    }
});