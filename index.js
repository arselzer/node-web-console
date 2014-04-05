var vm = require("vm");
var path = require("path");
var os = require("os");
var url = require("url");

var server = require("./server");
var vmConsole = require("./lib/vconsole");

var io = require("socket.io").listen(8767);

server();

io.sockets.on("connection", function(socket) {

  var requires = {};

  socket.on("require", function(data) {
    try {
    requires[data.name] = require(data.source);
    }
    catch (err) {
      console.log(err.message);
    }
  });

  socket.on("run", function(data) {

    var context = vm.createContext({
      "console": new vmConsole(),
      "path": path,
      "Buffer": Buffer,
      "os": os,
      "url": url
    });

    // "extend" context...
    Object.keys(requires).forEach(function(key) {
      context[key] = requires[key];
    });

    console.log("Received:", data);

    try {
      vm.runInContext(data, context);
    }
		catch (err) {
      // Errors shouldn't crash the server
      console.log(err);
      socket.emit("error", err.message);
    }
    
    socket.emit("output", context.console.output);
  });
});
