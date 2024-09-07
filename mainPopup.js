// mainPopup.js

document.addEventListener('DOMContentLoaded', function() {
    function updateTabList() {
        chrome.runtime.sendMessage({action: 'getTabs'}, function(tabs) {
            const tabList = document.getElementById('tabList');
            if (tabList) {
                tabList.innerHTML = ''; // Clear existing list
                tabs.forEach(function(tab) {
                    const listItem = document.createElement('li');
                    const tabTitle = document.createElement('b');
                    tabTitle.textContent = tab.title;
                    listItem.appendChild(tabTitle);
                    tabList.appendChild(listItem);
                });
            } else {
                console.error('Tab list element not found');
            }
        });
    }

    // Update tab list when popup opens
    updateTabList();

});