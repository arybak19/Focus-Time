let hiddenTabs = [];
let timerRunning = false;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed and running in the background.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startTimer' && !timerRunning) {
        timerRunning = true;
        chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (!request.selectedTabs.includes(tab.id)) {
            chrome.tabs.hide(tab.id, () => {
                hiddenTabs.push(tab.id);
            });
            }
        });
        });

        setTimeout(() => {
        hiddenTabs.forEach((tabId) => {
            chrome.tabs.show(tabId);
        });
        hiddenTabs = [];
        timerRunning = false;
        }, request.duration * 60000); // Convert minutes to milliseconds
    }
});
