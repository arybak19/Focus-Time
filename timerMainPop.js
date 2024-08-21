document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      var value = localStorage.getItem('myValue');
      var output = document.getElementById('value-output');
      output.innerText = value;
    }
  });
