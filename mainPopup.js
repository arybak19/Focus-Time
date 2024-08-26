// mainPopup.js

// Get all tabs in the current window
chrome.tabs.query({ currentWindow: true }, function(tabs) {
    // Create a list for each tab to be added to
    const tabList = document.getElementById('tabList');

    // Loop through each tab
    tabs.forEach(function(tab) {
        // Create a list item
        const listItem = document.createElement('li');

        // create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // label
        const label = document.createElement('label');
        label.textContent = tab.title;

        // Add the checkbox and label to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        // Add the list item to the list
        tabList.appendChild(listItem);
    });
});