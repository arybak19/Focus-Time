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
    window.onload = function() {
        var timeWanted = localStorage.getItem('timeWanted');
        if(timeWanted) {
            document.getElementById('focusTimeShowing').innerText = 'Focus Time: ' + parseInt(timeWanted, 10);
        } else {
            document.getElementById('focusTimeShowing').innerText = 'No time entered.';
        }
        }
        });