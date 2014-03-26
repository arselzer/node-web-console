var connect = require("connect");

var app = connect();

app.use(connect.static(__dirname + "/public"));

app.listen(8676);
console.log("Listening on port 8676");