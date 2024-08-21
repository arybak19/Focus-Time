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
        window.onload = function() {
            // Get the value from localStorage
            var value = localStorage.getItem('myValue');
            
            // Display the value on the page
            var output = document.getElementById('value-output');
            output.innerText = value;
        };

});

