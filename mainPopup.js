// mainPopup.js

// Get all tabs in every window
chrome.tabs.query({}, function(tabs) {
    // Create a list for each tab to be added to
    const tabList = document.getElementById('tabList');

    // Loop through each tab
    tabs.forEach(function(tab) {
        // Create a list item
        const listItem = document.createElement('li');

        const label = document.createElement('label');
        label.className = 'tabItem';

        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tab.id;

        // Label
        const labelText = document.createElement('span');
        labelText.textContent = tab.title;

        // Add the checkbox and label to the list item
        label.appendChild(checkbox);
        label.appendChild(labelText);

        listItem.appendChild(label);

        // Add the list item to the list
        tabList.appendChild(listItem);
    });
});

// Add event listener to the Focus button
document.querySelector('#focusButton').addEventListener('click', () => {
    // Get the selected tabs
    const checkboxes = document.querySelectorAll('#tabList input[type="checkbox"]');
    const selectedTabs = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedTabs.push(parseInt(checkbox.value, 10));
        }
    });

    // Get the value from localStorage
    const value = localStorage.getItem('myValue');
    const duration = parseInt(value, 10);

    // Send the message to the background script
    chrome.runtime.sendMessage({ action: 'startTimer', duration: duration, selectedTabs: selectedTabs });
});
