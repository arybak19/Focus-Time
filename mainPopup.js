// mainPopup.js

// Get all tabs in the current window
chrome.tabs.query({ currentWindow: true }, function(tabs) {
    const tabList = document.getElementById('tabList');
    tabs.forEach(function(tab) {
        const listItem = document.createElement('li');
        const tabTitle = document.createElement('b'); // Use <b> for bold
        tabTitle.textContent = tab.title;
        const tabUrl = document.createTextNode(` (${tab.url})`);
        listItem.appendChild(tabTitle);
        listItem.appendChild(tabUrl);
        tabList.appendChild(listItem);
    });

document.activeEventListener('DOMContentLoaded', function() {
    const timeFocus = localStorage.getItem('timeFocus');
    if (timeFocus) {
        document.getElementById('FocusTimeShowing').textContent = 'Focus Time: ${timeFocus} minutes';
    }
});
});