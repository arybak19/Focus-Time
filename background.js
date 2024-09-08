let hiddenTabs = [];
let timerRunning = false;
let originalWindowID = null;

// When the extension is installed and running in the background
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed and running in the background.');
    chrome.alarms.create('keepAlive', { periodInMinutes: 0.3 });
});

// Keep-alive alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'keepAlive') {
        console.log('Keep-alive alarm triggered');
    }
});

// When a message is received from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startTimer' && !timerRunning) {
        timerRunning = true;
        console.log('Timer started:', request.duration, 'minutes');

        // create the ID for the main window that the user is using
        chrome.tabs.query({active: true, currentWindow: true} , (tabs) => {
            originalWindowID = tabs[0].windowId;
        });

        // remove the tabs that are not in the selectedTabs array and add them to hiddenTabs
        chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (!request.selectedTabs.includes(tab.id)) {
            hiddenTabs.push(tab);
            chrome.tabs.remove(tab.id, () => {
                console.log('Tab removed:', tab.id);
            });
            }
        });
        });

        // start the timer and print to the console
        let remainingTime = request.duration * 60;
        let timerInterval = setInterval(() => {
            remainingTime--;
            console.log(`Time remaining: ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`);
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);

        chrome.webRequest.onBeforeRequest.addListener(
            function(details) {
                const url = new URL(details.url);
                if (url.hostname.endsWith('.gov') || url.hostname.endsWith('.edu') || selectedTabs.includes(details.url)) {
                    return {cancel: false};
                }
                return {cancel: true};
            },
            {urls: ["<all_urls>"]},
            ["blocking"]
        );

        // recreate the tabs that were removed, add them to the original window, and end the timer
        setTimeout(() => {
        hiddenTabs.forEach((tab) => {
            chrome.tabs.create({ url: tab.url, index: tab.index, pinned: tab.pinned }, (newTab) => {
            console.log('Tab recreated:', newTab.id);
            });
        });
        hiddenTabs = [];
        timerRunning = false;
        console.log('Timer ended');
        }, request.duration * 60000); // Convert minutes to milliseconds
    }
});
