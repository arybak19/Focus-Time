const startButton = document.getElementById('start');
startButton.onclick = function submitValue() {
    var input = document.getElementById('value-input');
    var value = input.value;
    localStorage.setItem('myValue', value);
    window.location.href = 'mainPopup.html';
}