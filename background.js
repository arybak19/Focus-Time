let hiddenTabs = [];
let timerRunning = false;
let originalWindowID = null;
let tabCreatedListener = null;
let tabUpdatedListener = null;
let selectedTabIds = new Set(); // Store selected tab IDs

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

        // Create the ID for the main window that the user is using
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            originalWindowID = tabs[0].windowId;
        });

        // Store the selected tab IDs in the set
        request.selectedTabs.forEach(tabId => selectedTabIds.add(tabId));

        // Remove the tabs that are not in the selectedTabs array and add them to hiddenTabs
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                if (!selectedTabIds.has(tab.id)) {
                    hiddenTabs.push(tab);
                    chrome.tabs.remove(tab.id, () => {
                        if (chrome.runtime.lastError) {
                            console.error(`Error removing tab ${tab.id}: ${chrome.runtime.lastError.message}`);
                        } else {
                            console.log('Tab removed:', tab.id);
                        }
                    });
                }
            });
        });

        // Listen for new tabs being created
        tabCreatedListener = (tab) => {
            console.log('New tab created:', tab.id);
        };
        chrome.tabs.onCreated.addListener(tabCreatedListener);

        // Listen for tab updates
        tabUpdatedListener = (tabId, changeInfo, tab) => {
            if (changeInfo.url && !selectedTabIds.has(tabId)) {
                setTimeout(() => {
                    if (!isValidURL(changeInfo.url)) {
                        chrome.tabs.remove(tabId, () => {
                            if (chrome.runtime.lastError) {
                                console.error(`Error removing tab ${tabId}: ${chrome.runtime.lastError.message}`);
                            } else {
                                console.log('Tab removed due to invalid URL:', tabId);
                            }
                        });
                    }
                }, 1000); // Increased delay to allow user to type and navigate
            }
        };
        chrome.tabs.onUpdated.addListener(tabUpdatedListener);

        // Start the timer and print to the console
        let remainingTime = request.duration * 60;
        let timerInterval = setInterval(() => {
            remainingTime--;
            console.log(`Time remaining: ${Math.floor(remainingTime / 60)}:${remainingTime % 60}`);
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);

        // Recreate the tabs that were removed, add them to the original window, and end the timer
        setTimeout(() => {
            hiddenTabs.forEach((tab) => {
                chrome.tabs.create({ url: tab.url, index: tab.index, pinned: tab.pinned }, (newTab) => {
                    if (chrome.runtime.lastError) {
                        console.error(`Error creating tab: ${chrome.runtime.lastError.message}`);
                    } else {
                        console.log('Tab recreated:', newTab.id);
                    }
                });
            });
            hiddenTabs = [];
            timerRunning = false;
            console.log('Timer ended');

            // Remove the tab created and updated listeners
            chrome.tabs.onCreated.removeListener(tabCreatedListener);
            chrome.tabs.onUpdated.removeListener(tabUpdatedListener);
        }, request.duration * 60000); // Convert minutes to milliseconds
    }
});

// Function to check if the URL is valid
function isValidURL(url) {
    const allowedURLs = [
        'chrome://newtab',
        'edge://newtab',
        'google.com',
        'bing.com',
        'yahoo.com'
    ];
    return allowedURLs.some(allowedURL => url.includes(allowedURL) || 
                                            url.includes('.gov') || 
                                            url.includes('.edu')
                            );
}