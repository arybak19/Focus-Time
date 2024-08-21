window.onload = function() {
    // Get the value from localStorage
    var value = localStorage.getItem('myValue');
    
    // Display the value on the page
    var output = document.getElementById('value-output');
    output.innerText = value;
};
chrome.tabs.executeScript({
    code: `
        Object.defineProperty(document, 'visibilityState', {
            get: function() {
                return 'visible'; // Always return 'visible'
            }
        });

        Object.defineProperty(document, 'hidden', {
            get: function() {
                return false; // Always return false (not hidden)
            }
        });
    `
});