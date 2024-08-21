
document.getElementById("start").addEventListener("click", submitValue);
function submitValue() {
    var input = document.getElementById('value-input');
    var value = input.value;
    localStorage.setItem('myValue', value);
}
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