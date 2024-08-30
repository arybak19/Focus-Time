// background.js

let timer;
let timeLeft;
let currentTabs = [];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isTimerRunning: false, timeLeft: 0 })
        .catch(error => console.error('Error setting initial storage:', error));
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'focusTimer') {
        updateTimer();
    }
});

function startTimer(duration) {
    chrome.storage.local.set({ isTimerRunning: true, timeLeft: duration })
        .then(() => {
            timeLeft = duration;
            chrome.alarms.create('focusTimer', { periodInMinutes: 1/60 });
            updateTimer();
        })
        .catch(error => console.error('Error starting timer:', error));
}

function stopTimer() {
    chrome.alarms.clear('focusTimer')
        .then(() => {
            chrome.storage.local.set({ isTimerRunning: false, timeLeft: 0 })
                .catch(error => console.error('Error stopping timer:', error));
        })
        .catch(error => console.error('Error clearing alarm:', error));
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        chrome.storage.local.set({ timeLeft: timeLeft })
            .catch(error => console.error('Error updating timer:', error));
            console.log(timeLeft)
        
        if (timeLeft === 0) {
            stopTimer();
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'logo.png',
                title: 'Focus Time',
                message: 'Your focus time is up!'
            }).catch(error => console.error('Error creating notification:', error));
        }
    }
}

function updateTabList() {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        currentTabs = tabs.map(tab => ({ id: tab.id, title: tab.title }));
    });
}

// Update tab list when a tab is created, updated, or removed
chrome.tabs.onCreated.addListener(updateTabList);
chrome.tabs.onUpdated.addListener(updateTabList);
chrome.tabs.onRemoved.addListener(updateTabList);

// Initial tab list update
updateTabList();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getTabs') {
        sendResponse(currentTabs);
    } else if (request.action === 'startTimer') {
        startTimer(request.duration * 60);  // Convert minutes to seconds
    } else if (request.action === 'stopTimer') {
        stopTimer();
    } else if (request.action === 'getTimerStatus') {
        chrome.storage.local.get(['isTimerRunning', 'timeLeft'], (result) => {
            sendResponse(result);
        });
        return true;  // Indicates that the response is sent asynchronously
    }
});