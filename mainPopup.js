// Get all tabs in the current window
chrome.tabs.query({}, function(tabs) {
    // Create a list for each tab to be added to
    const tabList = document.getElementById('tabList');

    // Loop through each tab
    tabs.forEach(function(tab) {
        // Create a list item
        const listItem = document.createElement('li');

        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tab.id;

        // Label
        const label = document.createElement('label');
        label.textContent = tab.title;

        // Add the checkbox and label to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        // Add the list item to the list
        tabList.appendChild(listItem);
    });
});

// Add event listener to the Focus button
document.querySelector('#focusButton').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#tabList input[type="checkbox"]');
    const selectedTabs = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedTabs.push(parseInt(checkbox.value, 10));
        }
    });

    const value = localStorage.getItem('myValue');
    const duration = parseInt(value, 10);

    chrome.runtime.sendMessage({ action: 'startTimer', duration: duration, selectedTabs: selectedTabs });
});
