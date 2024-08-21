// mainPopup.js

// Get all tabs in the current window
chrome.tabs.query({ currentWindow: true }, function(tabs) {
    const tabList = document.getElementById('tabList');
    tabs.forEach(function(tab) {
        const listItem = document.createElement('li');
        const tabTitle = document.createElement('b'); // Use <b> for bold
        tabTitle.textContent = tab.title;
        listItem.appendChild(tabTitle);
        tabList.appendChild(listItem);
    });
});
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
