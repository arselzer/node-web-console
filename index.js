var vm = require("vm");
var path = require("path");
var os = require("os");
var url = require("url");

var vmConsole = require("./lib/vconsole");

var io = require("socket.io").listen(8767);

io.sockets.on("connection", function(socket) {
  socket.on("js", function(data) {
    console.log("Received:", data);
    
    var context = vm.createContext({
    	"console": new vmConsole,
      "path": path,
      "Buffer": Buffer,
      "os": os,
      "url": url
    });
    
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