let timer;
let timeLeft;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isTimerRunning: false, timeLeft: 0 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'focusTimer') {
    updateTimer();
  }
});

function startTimer(duration) {
  chrome.storage.local.set({ isTimerRunning: true, timeLeft: duration });
  timeLeft = duration;
  
  chrome.alarms.create('focusTimer', { periodInMinutes: 1/60 });
  updateTimer();
}

function stopTimer() {
  chrome.alarms.clear('focusTimer');
  chrome.storage.local.set({ isTimerRunning: false, timeLeft: 0 });
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    chrome.storage.local.set({ timeLeft: timeLeft });
    
    if (timeLeft === 0) {
      stopTimer();
      // Notify the user that the timer is done
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'logo.png',
        title: 'Focus Time',
        message: 'Your focus time is up!'
      });
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
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

// Existing timer code...

let currentTabs = [];

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
    }
    // Existing timer message handlers...
});

// Rest of the existing background script...