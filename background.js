let timerDuration = 0;
let timerInterval = null;

function startTimer(duration) {
    timerDuration = duration;
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        timerDuration--;
        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            timerDuration = 0;
        }
        chrome.runtime.sendMessage({ type: 'updateTimer', duration: timerDuration });
    }, 1000);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.runtime.sendMessage({ type: 'updateTabs' });
    }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'updateValue') {
        localStorage.setItem('myValue', request.value);
        chrome.runtime.sendMessage({ type: 'valueUpdated', duration: request.value });
    }
});