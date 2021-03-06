const {ipcRenderer} = require('electron');

const close_button = document.getElementById("close")
const fullscreen_button = document.getElementById("fullscreen")
const reduce_button = document.getElementById("reduce")
const page_control = document.getElementById("page_control")

close_button.addEventListener("click", function (e) {
    ipcRenderer.send("close")
});

fullscreen_button.addEventListener("click", function (e) {
    ipcRenderer.send("fullscreen")
});

reduce_button.addEventListener("click", function (e) {
    ipcRenderer.send("minimize")
});