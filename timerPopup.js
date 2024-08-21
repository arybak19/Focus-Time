function startTimer(duration, display) {
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