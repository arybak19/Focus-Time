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

    function startTimer() {
        const input = document.getElementById('value-input');
        if (input) {
            const value = parseInt(input.value, 10);
            if (value > 0) {
                chrome.runtime.sendMessage({action: 'startTimer', duration: value});
                // Optionally close the popup or navigate to timer view
            } else {
                alert('Please enter a valid time in minutes.');
            }
        } else {
            console.error('Timer input element not found');
        }
    }

    function updateTimerDisplay() {
        chrome.runtime.sendMessage({action: 'getTimerStatus'}, (response) => {
            const timerStatus = document.getElementById('timerStatus');
            if (timerStatus) {
                if (response.isTimerRunning) {
                    let minutes = Math.floor(response.timeLeft / 60);
                    let seconds = response.timeLeft % 60;
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
                    timerStatus.textContent = `Active timer: ${minutes}:${seconds}`;
                } else {
                    timerStatus.textContent = 'No active timer';
                }
            } else {
                console.error('Timer status element not found');
            }
        });
    }

    // Update timer display when the popup opens
    updateTimerDisplay();
    // Optionally, update every second if you want a live countdown in the main popup
    setInterval(updateTimerDisplay, 1000);

    // Add event listener for the start button
    const startButton = document.getElementById("start");
    if (startButton) {
        startButton.addEventListener("click", startTimer);
    } else {
        console.error('Start button not found');
    }
});