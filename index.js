function handleSubmit() {
    const timeWanted = document.getElementById('timeWanted').value;
    sessionStorage.setItem('timeWanted', timeWanted.toString());
}