var hostname = "localhost";

var socket = io.connect("http://" + hostname + ":8767");

var jsInput = document.getElementById("jsinput");

jsinput.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    socket.emit("js", jsInput.value);
  }
});