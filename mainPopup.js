// mainPopup.js

// Get all tabs in the current window
chrome.tabs.query({ currentWindow: true }, function(tabs) {
    const tabList = document.getElementById('tabList');
    tabs.forEach(function(tab) {
        const listItem = document.createElement('li');
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = tab.title;
        const tabUrl = document.createTextNode(tab.url);
        details.appendChild(summary);
        details.appendChild(tabUrl);
        listItem.appendChild(details);
        tabList.appendChild(listItem);
    });

        });
        window.onload = function() {
            // Get the value from localStorage
            var value = localStorage.getItem('myValue');
            
            // Display the value on the page
            var output = document.getElementById('value-output');
            output.innerText = value;
        };

});

