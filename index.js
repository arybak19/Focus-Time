function updateValueDisplay(value) {
    var output = document.getElementById('value-output');
    output.innerText = value;
}
window.onload = function() {
    // Get the value from localStorage
    var value = localStorage.getItem('myValue');
    
    // Display the value on the page
    var output = document.getElementById('value-output');
    output.innerText = value;
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'valueUpdated') {
            updateValueDisplay(request.value);
        }
    });
};
document.getElementById("start").addEventListener("click", submitValue);
function submitValue() {
    var input = document.getElementById('value-input');
    var value = input.value;
    localStorage.setItem('myValue', value);
}
