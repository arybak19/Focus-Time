// mainPopup.js

function updateTabList() {
    chrome.runtime.sendMessage({action: 'getTabs'}, function(tabs) {
        const tabList = document.getElementById('tabList');
        tabList.innerHTML = ''; // Clear existing list
        tabs.forEach(function(tab) {
            const listItem = document.createElement('li');
            const tabTitle = document.createElement('b');
            tabTitle.textContent = tab.title;
            listItem.appendChild(tabTitle);
            tabList.appendChild(listItem);
        });
    });
}

// Update tab list when popup opens
document.addEventListener('DOMContentLoaded', updateTabList);

// Existing timer code...

function startTimer() {
    var input = document.getElementById('value-input');
    var value = parseInt(input.value, 10);
    if (value > 0) {
        chrome.runtime.sendMessage({action: 'startTimer', duration: value});
        // Optionally close the popup or navigate to timer view
    } else {
        alert('Please enter a valid time in minutes.');
    }
}

function updateTimerDisplay() {
    chrome.runtime.sendMessage({action: 'getTimerStatus'}, (response) => {
        const timerStatus = document.getElementById('timerStatus');
        if (response.isTimerRunning) {
            let minutes = Math.floor(response.timeLeft / 60);
            let seconds = response.timeLeft % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            timerStatus.textContent = `Active timer: ${minutes}:${seconds}`;
        } else {
            timerStatus.textContent = 'No active timer';
        }
    });
}

// Update timer display when the popup opens
document.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();
    // Optionally, update every second if you want a live countdown in the main popup
    setInterval(updateTimerDisplay, 1000);
});

// Add event listener for the start button
document.getElementById("start").addEventListener("click", startTimer);