var hostname = "localhost";

var socket = io.connect("http://" + hostname + ":8767");

var requires = {
  "url": "url",
  "path": "path"
}

function showRequires() {
  $(".requires td").remove();
  Object.keys(requires).forEach(function(key) {
    requireTable.append(
      "<tr>" +
        "<td>" + key + "</td>" +
        "<td>" + requires[key] + "</td>" +
      "</tr>"
    );
  });
}

function requestGlobal(name, source) {
  socket.emit("require", {
    "name": name,
    "source": source
  });
}

function requestGlobals() {
  Object.keys(requires).forEach(function(key) {
    requestGlobal(key, requires[key]);
  });
}

var jsInput = $("#jsinput");
var jsOutput = $("#jsoutput");
var submitJs = $("#submitjs");
var addRequire = $("#addrequire");
var requireTable = $(".requires");

var nameField = $(".name-input");
var requireField = $(".require-input");

showRequires();
requestGlobals();

addRequire.on("click", function() {
  requires[nameField.val()] = requireField.val();
  showRequires();
  requestGlobals();
});

editor.getSession().setValue(sessionStorage.getItem("js-input"));

jsInput.on("change input textInput keypress", function() {
  sessionStorage.setItem("js-input", editor.getSession().getValue());
});

submitJs.on("focus", function() {
  setTimeout(function() {
    submitJs.blur();
  }, 400);
});

submitJs.on("click", function() {
	var js = editor.getSession().getValue();
  socket.emit("run", js);
});

socket.on("output", function(data) {
  jsOutput.html(data);
});

socket.on("error", function(data) {
  console.log("Error:", data);
  var error = $("error");
  error.css("display", "block");
  error.val(data);
  
  setTimeout(function() {
    error.css("display","none");
  }, 6000);
});
