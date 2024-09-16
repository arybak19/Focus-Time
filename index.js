// Add event listener to the button
document.getElementById("start").addEventListener("click", function(event) { submitValue(event);});

// Function to set the value in localStorage
function submitValue(event) {
    var input = document.getElementById('value-input');
    var value = parseInt(input.value, 10);

    if (value >= 1 && value <= 120) {
    localStorage.setItem('myValue', value);
    } else {
        alert("Please enter a time between 1 and 120 minutes.");
        event.preventDefault();
    }
}