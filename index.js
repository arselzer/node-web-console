var vm = require("vm");
var util = require("util");

var io = require("socket.io").listen(8767);

function vmConsole() {
  this.output = "";
}

vmConsole.prototype.log = function() {
  this.output += util.format.apply(this, arguments) + "\n";
}

io.sockets.on("connection", function(socket) {
  socket.on("js", function(data) {
    console.log("Received:", data);
    
    var context = vm.createContext({
    	"console": new vmConsole,
    });
    
    vm.runInContext(data, context);
    
    socket.emit("output", context.console.output);
  });
});