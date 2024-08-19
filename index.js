function userTime() {
    var timeWanted = parseInt(document.getElementById('timeWanted').value, 10);
    localStorage.setItem('timeWanted', timeWanted.toString());
}