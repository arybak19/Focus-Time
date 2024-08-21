
document.getElementById("start").addEventListener("click", submitValue);
function submitValue() {
    var input = document.getElementById('value-input');
    var value = input.value;
    localStorage.setItem('myValue', value);
}
chrome.tabs.executeScript(submitValue, { file: 'content.js' });