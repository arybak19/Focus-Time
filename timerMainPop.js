// timerMainPop.js

// Get the value for time from localStorage
window.onload = function() {
    // Get the value from localStorage
    var value = localStorage.getItem('myValue');
    
    // Display the value on the page
    var output = document.getElementById('value-output');
    output.innerText = value;
};