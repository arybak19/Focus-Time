/*function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function ()       { 
minutes = parseInt(timer / 60, 10);
seconds = parseInt(timer % 60, 10);

minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;

display.textContent = minutes + ":" + seconds;

if(--timer < 0 ) {
    timer = duration;
   }
    }, 1000);    
}

   window.onload = function() {
        var value = localStorage.getItem('myValue');
        let output = parseInt(value, 10);
        var userInput = 60 * output, //the five will be the users inputed time
        display = document.querySelector('#time');
        startTimer(userInput, display);
    };
    chrome.tabs.executeScript(timer, { file: 'content.js' });*/
    // background.js (new file)
let timerDuration;
let interval;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    timerDuration = request.duration;
    interval = setInterval(() => {
      timerDuration--;
      chrome.runtime.sendMessage({ action: "updateTimer", time: timerDuration });
      if (timerDuration <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  } else if (request.action === "stopTimer") {
    clearInterval(interval);
  }
});

// timerPopup.js
function startTimer(duration) {
  chrome.runtime.sendMessage({ action: "startTimer", duration: duration });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateTimer") {
    let minutes = parseInt(request.time / 60, 10);
    let seconds = parseInt(request.time % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.querySelector('#display').textContent = minutes + ":" + seconds;
  }
});

window.onload = function() {
  var value = localStorage.getItem('myValue');
  var display = document.querySelector('#display');
  startTimer(value);
};
