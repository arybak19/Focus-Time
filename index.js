// Add event listener to the button
document.getElementById("start").addEventListener("click", submitValue);

// Function to set the value in localStorage
function submitValue() {
    var input = document.getElementById('value-input');
    var value = input.value;
    localStorage.setItem('myValue', value);
}