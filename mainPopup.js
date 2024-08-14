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
    window.addEventListener('load', () => {
        const params = new (URL(document.location)).searchParams;
        const time = params.get('timeWanted');

        document.getElementById('userTime').innerHTML = time;
    })
        });