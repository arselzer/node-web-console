var io = require("socket.io").listen(8767);

io.sockets.on("connection", function(socket) {
  socket.on("js", function(data) {
    console.log("js", data);
  });
});