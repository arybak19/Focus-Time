function passvalue() {
    var num = document.getElementById("time").value;
    localStorage.setItem("numValue", num);
    return false;
}